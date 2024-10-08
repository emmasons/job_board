"use client";
import { useRouter } from "next/navigation";
import styles from "./PaymentForm.module.css";
import { useState, useRef, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";

import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { Icon } from "@iconify/react";

type Props = {
  clientID: string;
  clientToken: string;
  jobId: string;
  jobTitle: string;
};

export const PaymentForm = ({
  clientID,
  clientToken,
  jobId,
  jobTitle,
}: Props) => {
  const [loader, showLoader] = useState(false);
  const [success, showSuccess] = useState(false);
  const [error, showErrorMsg] = useState(false);
  const [transactionData, setTransactionData] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();

  useEffect(() => {
    if (errorMsg && Object.keys(errorMsg).length > 0) {
      const description = errorMsg.details[0].description;

      toast({
        title: "Error",
        description: description,
        variant: "destructive",
        className: "bg-red-500 border-0",
      });
    }
    if (success) {
      router.push(`/jobs/${jobId}/apply`);
    }
  }, [jobId, errorMsg, router, success]);

  const SubmitPayment = () => {
    // Here declare the variable containing the hostedField instance
    const { cardFields } = usePayPalHostedFields();
    const cardHolderName = useRef(null);

    const submitHandler = () => {
      if (typeof cardFields.submit !== "function") return; // validate that `submit()` exists before using it
      if (errorMsg) showErrorMsg(false);
      showLoader(true);
      showSuccess(false);
      cardFields
        .submit({
          // The full name as shown in the card and billing addresss
          // These fields are optional for Sandbox but mandatory for production integration
          cardholderName: cardHolderName?.current?.value,
        })
        .then((order) => {
          const { orderId } = order;
          fetch(`/api/payments/paypal/${orderId}`)
            .then((response) => response.json())
            .then((data) => {
              showLoader(false);
              showSuccess(true);
              setTransactionData(data);
              // Inside the data you can find all the information related to the payment
            })
            .catch((err) => {
              // Handle capture order error
              showLoader(false);
              showErrorMsg(true);
              setErrorMsg(err);
            });
        })
        .catch((err) => {
          // Handle validate card fields error
          showLoader(false);
          showErrorMsg(true);
          setErrorMsg(err);
        });
    };

    return (
      <div className="flex items-center gap-4">
        <Button
          onClick={submitHandler}
          className="btn btn-primary flex"
          disabled={success}
        >
          {success ? (
            <span className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-white" /> Success
            </span>
          ) : (
            "Pay"
          )}
        </Button>
      </div>
    );
  };

  // added clientId which is not in example
  return (
    <div className="h-full bg-gray-50">
      <MaxWidthWrapper className="justify-start gap-16 pt-24 md:flex">
        <div className="flex flex-grow basis-1/2  ">
          <div className="p-4">
            <Link
              href={`/jobs/${jobId}`}
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft /> Back to Job
            </Link>
            <h1 className="text-pes-red py-4 text-2xl font-semibold">
              {jobTitle}
            </h1>
            <p className="text-pes-red text-3xl font-bold">
              {formatPrice(2500)}
            </p>

            <div className="text-pes-red mt-6 flex w-full items-center gap-4">
              <p>&copy; Jobs Connect Limited</p>
              <Link href="#">Terms</Link>
              <Link href="#">Privacy</Link>
            </div>
          </div>
        </div>
        <div className="flex-grow basis-1/2 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
          <PayPalScriptProvider
            options={{
              "client-id": clientID,
              "data-client-token": clientToken, // Replace "client-id" with "data-client-token"
              components: "hosted-fields",
              clientId: clientID,
              dataUserIdToken: clientToken,
            }}
          >
            <PayPalHostedFieldsProvider
              createOrder={() => {
                // Here define the call to create and order
                return fetch("/api/payments/paypal", {
                  body: JSON.stringify({ jobId: jobId }),
                  method: "POST",
                })
                  .then((response) => response.json())
                  .then((order) => order.id)
                  .catch((err) => {
                    // Handle order creation error
                    showLoader(false);
                    showErrorMsg(true);
                    setErrorMsg(err);
                  });
              }}
            >
              <section className={styles.container}>
                <h3 className="py-4 text-center font-semibold">
                  Course Checkout
                </h3>
                <div className={styles.card_container}>
                  <div className="flex items-center justify-between">
                    <label htmlFor="card-number">Card Number</label>
                    <div className="flex items-center gap-1">
                      <Icon icon="logos:visa" className="h-[20px] w-10" />
                      <Icon icon="logos:mastercard" className="h-[20px] w-10" />
                      <Icon icon="logos:amex" className="h-[20px] w-10" />
                    </div>
                  </div>
                  <PayPalHostedField
                    id="card-number"
                    hostedFieldType="number"
                    options={{
                      selector: "#card-number",
                      placeholder: "4111 1111 1111 1111",
                    }}
                    className={styles.card_field}
                  />
                  <section style={{ display: "flex" }}>
                    <div
                      style={{ flexDirection: "column", marginRight: "10px" }}
                    >
                      <label htmlFor="cvv">CVV</label>
                      <PayPalHostedField
                        id="cvv"
                        hostedFieldType="cvv"
                        options={{
                          selector: "#cvv",
                          placeholder: "123",
                        }}
                        className={styles.card_field}
                      />
                    </div>
                    <div style={{ flexDirection: "column" }}>
                      <label htmlFor="expiration-date">Expiration Date</label>
                      <PayPalHostedField
                        id="expiration-date"
                        hostedFieldType="expirationDate"
                        className={styles.card_field}
                        options={{
                          selector: "#expiration-date",
                          placeholder: "MM/YY",
                        }}
                      />
                    </div>
                  </section>

                  <label title="This represents the full name as shown in the card">
                    Card Holder Name
                  </label>
                  <input
                    id="card-holder"
                    className={styles.card_field}
                    type="text"
                    placeholder="Full name"
                  />
                  <label title="billing address country">Country</label>
                  <input
                    id="card-billing-address-country"
                    className={styles.card_field}
                    type="text"
                    placeholder="country"
                  />

                  {loader && (
                    <Button className="btn btn-primary flex items-center gap-4">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      Processing...
                    </Button>
                  )}
                  {!loader && <SubmitPayment />}
                </div>
              </section>
            </PayPalHostedFieldsProvider>
          </PayPalScriptProvider>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
