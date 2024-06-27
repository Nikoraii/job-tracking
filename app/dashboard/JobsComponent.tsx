"use client";

import { FormEvent, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Option,
  IconButton,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { deleteJob, editJob } from "./actions";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function JobsComponent({ jobsData }: any) {
  // Toggle dialog for delete
  const [deleteDialog, setDeleteDialog] = useState(false);

  // Toggle dialog for edit
  const [editDialog, setEditDialog] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // JobListing object
  const [job, setJob] = useState<JobListing>();

  const [jobValue, setJobValue] = useState<string>(""); // Job title
  const [companyValue, setCompanyValue] = useState<string>(""); // Company name
  const [selectValue, setSelectValue] = useState<string>("applied"); // Application status
  const [descriptionValue, setDescriptionValue] = useState<string>(""); // Description

  // Alert toggle on job edit
  const [alert, setAlert] = useState(false);

  // Set current job of that one that was clicked and toggle delete dialog
  const handleDeleteDialog = (jobT: JobListing) => {
    setJob(jobT);
    setDeleteDialog(!deleteDialog);
  };

  // Set all values from current job so that they could fill up the edit inputs
  const handleEditDialog = (jobT: JobListing) => {
    setJobValue(jobT["job_title"]);
    setCompanyValue(jobT.company);
    setSelectValue(jobT.status);
    setDescriptionValue(jobT.description || "");
    setJob(jobT);
    setEditDialog(!editDialog);
  };

  // Show per page
  const jobsPerPage = 6;

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobsData.slice(indexOfFirstJob, indexOfLastJob);

  // Calculate total pages from job count
  const totalPages = Math.ceil(jobsData.length / jobsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Check data before submition
  const checkEditData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Set ID so edit knows which one to change, select needs to be added manually because material-tailwind uses button elemnt for select
    if (job) {
      formData.set("jobID", job.id);
      formData.set("status", selectValue);
    }

    const response = await editJob(formData);

    // Show alert box for 3s on success
    if (response === true) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  return (
    <div>
      <div hidden={!alert}>
        <Alert
          icon={<IoCheckmarkCircleSharp />}
          className="rounded-none fixed z-50 top-20 w-fit right-0 border-l-4 border-[#2ec946] bg-[#E4F5E9] font-medium text-[#2ec946]">
          Job successfully edited.
        </Alert>
      </div>
      <Dialog open={deleteDialog} handler={handleDeleteDialog}>
        <DialogHeader>Delete job {job && job["job_title"]}?</DialogHeader>
        <DialogBody>
          You are about to delete job {job && job["job_title"]}. Are you sure
          that you want to do that?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => job && handleDeleteDialog(job)}
            className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => {
              job && deleteJob(job.id);
              job && handleDeleteDialog(job);
            }}>
            <span>DELETE</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={editDialog} handler={handleEditDialog}>
        <DialogHeader>Edit job {job && job["job_title"]}?</DialogHeader>
        <DialogBody>
          <form
            id="edit-form"
            onSubmit={checkEditData}
            className="flex flex-col gap-6">
            <div>
              <label htmlFor="job">Job title</label>
              <Input
                type="text"
                name="job"
                required
                placeholder="Job title*"
                value={jobValue}
                onChange={(e) => setJobValue(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="company">Company name</label>
              <Input
                type="text"
                name="company"
                required
                placeholder="Company name*"
                value={companyValue}
                onChange={(e) => setCompanyValue(e.target.value)}
              />
            </div>

            <div>
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
            </div>

            <div>
              <label htmlFor="description">Note</label>
              <Textarea
                placeholder="Note"
                name="description"
                resize
                value={descriptionValue}
                onChange={(e) =>
                  setDescriptionValue(e.target.value)
                }></Textarea>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => job && handleEditDialog(job)}
            className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            type="submit"
            form="edit-form"
            onClick={() => {
              job && handleEditDialog(job);
            }}>
            <span>SAVE</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <div className="w-11/12 md:w-2/3 mx-auto mt-4">
        {currentJobs.length > 0 && (
          <Typography variant="h5" color="indigo">
            Your jobs
          </Typography>
        )}
        {currentJobs.length === 0 && (
          <Typography variant="h5" color="indigo">
            Add new job!
          </Typography>
        )}
        {currentJobs.map((job: any) => {
          const date = new Date(job["created_at"]);

          const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          };

          const parsedDate = new Intl.DateTimeFormat("en-US", options).format(
            date
          );
          return (
            <>
              <Card key={job.id} className="mt-4 border-2 border-indigo-50">
                <CardBody>
                  <div className="flex justify-between">
                    <Typography variant="h6" color="indigo" textGradient>
                      {job["job_title"]} <StatusBadge status={job.status} />
                    </Typography>
                    <div className="flex">
                      <IconButton
                        color="indigo"
                        variant="text"
                        onClick={() => handleEditDialog(job)}>
                        <FaRegEdit />
                      </IconButton>

                      <IconButton
                        color="indigo"
                        variant="text"
                        onClick={() => handleDeleteDialog(job)}>
                        <FaTrashAlt />
                      </IconButton>
                    </div>
                  </div>
                  <Typography variant="small">
                    {job.company} - {parsedDate}
                  </Typography>
                  <Typography variant="lead">{job.description}</Typography>
                </CardBody>
              </Card>
            </>
          );
        })}
        {currentJobs.length > 0 && (
          <div className="flex justify-center mt-4">
            <IconButton
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="mx-1"
              color="indigo">
              <FaArrowLeft className="h-5 w-5" />
            </IconButton>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                variant={currentPage === index + 1 ? "filled" : "outlined"}
                className="mx-1"
                color="indigo">
                {index + 1}
              </Button>
            ))}
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="mx-1"
              color="indigo">
              <FaArrowRight className="h-5 w-5" />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "applied":
      return (
        <div className="inline">
          -&nbsp;
          <Chip
            value={status}
            className="inline text-xs"
            variant="ghost"
            size="sm"
            color="blue"
          />
        </div>
      );
    case "declined":
      return (
        <div className="inline">
          -&nbsp;
          <Chip
            value={status}
            className="inline text-xs"
            variant="ghost"
            size="sm"
            color="red"
          />
        </div>
      );
    case "received-offer":
      return (
        <div className="inline">
          -&nbsp;
          <Chip
            value={status}
            className="inline text-xs"
            variant="ghost"
            size="sm"
            color="amber"
          />
        </div>
      );
    case "accepted":
      return (
        <div className="inline">
          -&nbsp;
          <Chip
            value={status}
            className="inline text-xs"
            variant="ghost"
            size="sm"
            color="green"
          />
        </div>
      );
    default:
      return <></>;
  }
}
