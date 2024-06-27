"use client";
import { FormEvent, useState } from "react";
import { createJob } from "./actions";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";

export default function FormComponent() {
  // Toggle form
  const [open, setOpen] = useState(1);

  const [jobValue, setJobValue] = useState<string>(""); // Job title
  const [companyValue, setCompanyValue] = useState<string>(""); // Company name
  const [selectValue, setSelectValue] = useState<string>("applied"); // Application status
  const [descriptionValue, setDescriptionValue] = useState<string>(""); // Note

  // Toggle loader when submitting form
  const [loading, setLoading] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false); // Message to show on SUCCESS
  const [messageError, setMessageError] = useState(false); // Message to show on ERROR

  // Handler for form toggle
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  // Check data before sending it to server
  const checkData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Show loader on form submit
    setLoading(true);

    // Ger formdata
    const formData = new FormData(event.currentTarget);

    // Status needs to be added manually because material-tailwind uses buttons for input select
    formData.set("status", selectValue);
    const response = await createJob(formData);

    // Toggle loader off and show message
    if (response) {
      setLoading(false);
      setMessageSuccess(true);
    } else {
      setLoading(false);
      setMessageError(true);
    }

    // Clean input values after submitting
    setJobValue("");
    setCompanyValue("");
    setSelectValue("applied");
    setDescriptionValue("");
  };

  return (
    <Card className="w-11/12 md:w-2/3 mx-auto p-4">
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          <Typography variant="lead">Add new job application?</Typography>
        </AccordionHeader>
        <AccordionBody>
          {/* ADD NEW JOB APPLICATION FORM */}
          <form onSubmit={checkData} className="flex flex-col gap-2 mt-4">
            <label htmlFor="job">Job title</label>
            <Input
              type="text"
              name="job"
              required
              placeholder="Job title*"
              value={jobValue}
              onChange={(e) => setJobValue(e.target.value)}
            />

            <label htmlFor="company">Company name</label>
            <Input
              type="text"
              name="company"
              required
              placeholder="Company name*"
              value={companyValue}
              onChange={(e) => setCompanyValue(e.target.value)}
            />

            <Select
              name="status"
              label="Status"
              value={selectValue}
              onChange={(val) => setSelectValue(val || "applied")}>
              <Option value="applied">Applied</Option>
              <Option value="declined">Declined</Option>
              <Option value="received-offer">Received Offer</Option>
              <Option value="accepted">Accepted</Option>
            </Select>

            <label htmlFor="description">Note</label>
            <Textarea
              placeholder="Note"
              name="description"
              resize
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}></Textarea>

            <div className="text-center">
              <Button
                type="submit"
                color="indigo"
                variant="gradient"
                className="w-fit h-fit mx-auto"
                loading={loading}>
                ADD
              </Button>
            </div>
          </form>

          <div className="text-center mt-2">
            <div hidden={!messageSuccess}>
              <Typography
                className="font-semibold"
                variant="small"
                color="green"
                textGradient>
                New job application added!
              </Typography>
            </div>

            <div hidden={!messageError}>
              <Typography
                className="font-semibold"
                color="red"
                variant="small"
                textGradient>
                Sorry, something went wrong.
              </Typography>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </Card>
  );
}
