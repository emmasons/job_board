import { useEffect, useState } from "react";

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

type Skill = keyof typeof sampleSkills;

const SkillGenerator = ({
  onSelect,
}: {
  onSelect: (skill: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filteredSkills = sampleSkills.filter((skill) =>
        skill.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredSkills(filteredSkills);
    } else {
      setFilteredSkills([]);
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (skill: string) => {
    onSelect(skill);
    setInputValue("");
    setFilteredSkills([]);
    setSelectedSkills([...selectedSkills, skill]);

    console.log(selectedSkills);
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full rounded-md border border-input px-3 py-2"
        placeholder="Type a skill..."
      />
      {filteredSkills.length > 0 && (
        <ul className="mt-2 flex flex-col">
          {filteredSkills.map((skill) => (
            <li
              key={skill}
              className="cursor-pointer rounded-md bg-background px-3 py-2 hover:bg-accent"
              onClick={() => handleSelect(skill)}
            >
              {skill}
            </li>
          ))}
        </ul>
      )}

      {selectedSkills.length > 0 && (
        <ul className="mt-2 flex flex-col">
          {selectedSkills.map((skill) => (
            <li
              key={skill}
              className="cursor-pointer rounded-md bg-background px-3 py-2 hover:bg-accent"
              //   onClick={() => handleSelect(skill)}
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillGenerator;
