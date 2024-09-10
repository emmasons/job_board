import { Button } from "@/components/ui/button";
import {
  CheckCheck,
  CircleSlash2,
  Loader2,
  Plus,
  Trash,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Skill } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

const sampleSkills = [
  "accounting software",
  "bookkeeping",
  "tax preparation",
  "javascript",
  "python",
  "java",
  "c++",
  "excel",
  "sql",
  "tableau",
  "power bi",
  "adobe creative suite",
  "google analytics",
  "facebook ads",
  "hooting",
  "adobe photoshop",
  "illustrator",
  "sketch",
  "figma",
  "solidworks",
  "autocad",
  "matlab",
  "circuit analysis",
  "workday",
  "bamboo",
  "zenefits",
  "erp systems",
  "financial modeling",
  "financial analysis",
  "valuation",
  "investment research",
  "legal research",
  "case management",
  "document review",
  "contract negotiation",
  "curriculum development",
  "classroom management",
  "lesson planning",
  "assessment design",
].flat();

type SuggestedSkill = keyof typeof sampleSkills;

type Props = {
  profilePercentage: number;
  skills: Skill[];
  profileId: string;
  isJobSeekerComponent: boolean;
};

const SkillGenerator = ({
  profilePercentage,
  skills,
  profileId,
  isJobSeekerComponent = true,
}: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const [inputValue, setInputValue] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillList, setSkillList] = useState(skills);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const percentage = skillList?.length > 0 ? 0 : profilePercentage;

  useEffect(() => {
    if (inputValue.length > 0) {
      const filteredSampleskills = sampleSkills.filter(
        (skill) => !skillList?.some((s) => s.skill === skill),
      );
      const filteredSkills = filteredSampleskills.filter((skill) =>
        skill.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredSkills(filteredSkills);
    } else {
      setFilteredSkills([]);
    }
  }, [inputValue, skillList]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (skill: string) => {
    setInputValue("");
    setFilteredSkills([]);
    setSelectedSkills([...selectedSkills, skill]);

    console.log(selectedSkills);
  };

  const saveSkills = async () => {
    if (selectedSkills.length + skillList.length > 10) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "The total number of skills cannot exceed 10.",
      });
      return;
    }
    const checkSimilarStrings = selectedSkills.some((skill1, index) =>
      selectedSkills
        .slice(index + 1)
        .some((skill2) => skill1.toLowerCase().includes(skill2.toLowerCase())),
    );
    if (checkSimilarStrings) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please remove the duplicated skills.",
      });
      return;
    }

    const checkExistingStrings = selectedSkills.some((skill) =>
      skillList.some(
        (item) => item.skill.toLowerCase() === skill.toLowerCase(),
      ),
    );
    if (checkExistingStrings) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Some of the selected skills already exist in your list.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      if (skillList.length >= 10) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You cannot add more than 10 skills.",
        });
        return;
      }

      const requestBody = {
        selectedSkills: Array.from(selectedSkills),
        profilePercentage: percentage,
      };

      const res = await fetch(
        `/api/job-seeker/profile/${profileId}/skills/bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      const response = await res.json();
      console.log(response);

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      } else {
        toast({
          variant: "default",
          title: "Success",
          description: "Skills updated successfully.",
          className: "bg-green-500",
        });
        const addedSkills = response.data;
        const newSkills = addedSkills.filter(
          (newSkill) => !skillList.some((skill) => skill.id === newSkill.id),
        );
        setSkillList([...skillList, ...newSkills]);
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  const deleteSkill = async (skillId: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/job-seeker/profile/${profileId}/skills/${skillId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const isJson = res.headers
        .get("content-type")
        ?.includes("application/json");
      const response = isJson ? await res.json() : null;

      if (!res.ok) {
        const errorMessage = response
          ? response.message
          : "An unexpected error occurred";
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      } else {
        toast({
          variant: "default",
          title: "Success",
          description: "Skill deleted successfully.",
          className: "bg-green-500",
        });
        setSkillList(skillList.filter((skill) => skill.id !== skillId));
        router.refresh();
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const removeSelectedSkill = (skillId: string) =>
    setSelectedSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillId),
    );

  return (
    <>
      {isJobSeekerComponent ? (
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 bg-sky-100 p-4">
            {skillList.map((skill) => (
              <Badge
                key={skill.id}
                variant={"secondary"}
                className="flex items-center capitalize text-primary"
              >
                {skill.skill}
                {isDeleting ? (
                  <CircleSlash2 className="ml-2 size-5 text-slate-500" />
                ) : (
                  <Trash2
                    className="ml-2 size-5 cursor-pointer text-red-600 duration-200 hover:scale-110 hover:text-red-800"
                    onClick={() => deleteSkill(skill.id)}
                  />
                )}
              </Badge>
            ))}
          </div>
          {selectedSkills.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-4 p-4">
              {selectedSkills.map((skill) => (
                <li
                  key={skill}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-sky-100 px-3 py-2 capitalize hover:bg-orange-100"
                  //   onClick={() => handleSelect(skill)}
                >
                  {skill}
                  <XCircle
                    className="ml-2 cursor-pointer text-red-600 duration-200 hover:scale-110 hover:text-red-800"
                    onClick={() => removeSelectedSkill(skill)}
                  />
                </li>
              ))}
              <Button className="hover:bg-sky-600" onClick={saveSkills}>
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </ul>
          )}
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full rounded-md px-3 py-2  focus:outline-none"
              placeholder="Type a skill..."
            />
            <button
              type="button"
              className="ml-2 rounded-md bg-background bg-secondary px-3 py-2 hover:bg-orange-100"
              onClick={() => handleSelect(inputValue)}
            >
              <Plus className="size-9" />
            </button>
          </div>
          {filteredSkills.length > 0 && (
            <ul className="mt-2 flex flex-col">
              {filteredSkills.map((skill) => (
                <li
                  key={skill}
                  className="cursor-pointer rounded-md bg-background px-3 py-2 capitalize hover:bg-orange-100"
                  onClick={() => handleSelect(skill)}
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>
          <h3 className="mb-2 font-semibold">Skills added</h3>
          <ul className="mt-2 space-y-2 p-4">
            {skillList?.map((skill, index) => (
              <li
                key={index}
                className="flex items-center gap-2 px-3 py-2 text-[0.8rem] capitalize"
              >
                <CheckCheck className="h-4 w-4" />
                {skill.skill}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SkillGenerator;
