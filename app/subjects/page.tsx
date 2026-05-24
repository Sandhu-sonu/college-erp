"use client";

import { useState } from "react";

export default function SubjectsPage() {

  const [courseName, setCourseName] =
    useState("");

  const [semester, setSemester] =
    useState(1);

  const [subjectType, setSubjectType] =
    useState("");

  const [subjectsText, setSubjectsText] =
    useState("");



  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    const subjects =
      subjectsText

        .split(/\n|,/)

        .map((s) => s.trim())

        .filter(Boolean);



    for (const subject of subjects) {

      await fetch(
        "/api/subjects",

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            subjectName:
              subject,

            courseName,

            semester,

            subjectType,

          }),

        }
      );

    }

    alert(
      "Subjects Added Successfully"
    );

    setSubjectsText("");

  };



  return (

    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">

        Bulk Add Subjects

      </h1>



      <form
        onSubmit={handleSubmit}
        className="grid gap-5"
      >

        <select
          required

          className="border p-3 rounded"

          onChange={(e) =>
            setCourseName(
              e.target.value
            )
          }
        >

          <option value="">
            Select Course
          </option>

          <option value="BA">
            BA
          </option>

          <option value="BCom">
            BCom
          </option>

        </select>



        <select
          className="border p-3 rounded"

          onChange={(e) =>
            setSemester(
              Number(
                e.target.value
              )
            )
          }
        >

          <option value="1">
            Semester 1
          </option>

          <option value="2">
            Semester 2
          </option>

          <option value="3">
            Semester 3
          </option>

          <option value="4">
            Semester 4
          </option>

          <option value="5">
            Semester 5
          </option>

          <option value="6">
            Semester 6
          </option>

        </select>



        <select
          required

          className="border p-3 rounded"

          onChange={(e) =>
            setSubjectType(
              e.target.value
            )
          }
        >

          <option value="">
            Subject Type
          </option>

          <option value="Compulsory">
            Compulsory
          </option>

          <option value="Major">
            Major
          </option>

          <option value="Minor">
            Minor
          </option>

          <option value="Elective">
            Elective
          </option>

          <option value="AEC">
            AEC
          </option>

          <option value="VAC">
            VAC
          </option>

          <option value="SEC">
            SEC
          </option>

        </select>



        <textarea
          rows={8}

          placeholder="Enter subjects separated by commas"

          className="border p-3 rounded"

          value={subjectsText}

          onChange={(e) =>
            setSubjectsText(
              e.target.value
            )
          }
        />



        <button
          type="submit"

          className="bg-blue-600 text-white p-3 rounded"
        >

          Add Subjects

        </button>

      </form>

    </div>

  );

}