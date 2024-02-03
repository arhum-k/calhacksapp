"use client"
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import Navbar from "./Components/Navbar";

export default function Home() {


  /* const [formData, setFormData] = useState({
    fullName: null,
    university: null,
    major: null,
    gradDate: null,
    gender: null,
    country: null,
    essay: null,
  }) */
  const essayPrompt = `
  Why are you interested in attending Cal Hacks 11.0? What are you interested in
  building? (1000 character maximum)
  `
  const [formData, setFormData] = useState<any>({
    fullName: {
      data: null, label: "Full Name", var: "fullName", type: "text", placeholder: "John Doe", id: "fullName", name: "fullName"
    },
    university: {
      data: null, label: "University", var: "university", type: "text", placeholder: "University of California - Berkeley", id: "university", name: "university"
    },
    major: {
      data: null, label: "Major", var: "major", type: "text", placeholder: "Computer Science", id: "major", name: "major"
    },
    gradDate: {
      data: null, label: "Graduation Date", var: "gradDate", type: "date", placeholder: "", id: "gradDate", name: "gradDate"
    },
    gender: {
      data: null, label: "Gender", var: "gender", type: "text", placeholder: "", id: "gender", name: "gender"
    },
    country: {
      data: null, label: "Country of Residence", var: "country", placeholder: "", id: "country", name: "country"
    },
    essay: {
      data: null, label: "The Essay", var: "essay", placeholder: ". . .", id: "essay", name: "essay"
    },
  })

  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [ageCheck, setAgeCheck] = useState(false)
  const [error, setError] = useState(false)




  const handleChange: React.ChangeEvent<HTMLSelectElement> | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name],
        data: value
      },
    }));

  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    setError(false)

    const tempErrors: string[] = []

    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData].data === null) {
        tempErrors.push(`${formData[key].label}  is required *`)
      }
    })
    /* errorMessage.push(`${nullFields.join(', ')} are required fields`); */

    if (!ageCheck) {
      tempErrors.push("You must be 18+ to participate in the hackathon. *")
    }

    if (tempErrors.length > 0) {
      setError(true)
    }
    else {
      setError(false)
    }

    if (formData.essay.data && formData.essay.data.length > 1000) {
      tempErrors.push("Your response cannot be more than 1000 characters")
    }

    setErrorMessage(tempErrors)
    console.log(errorMessage)

  }


  console.log(formData)
  console.log(error)

  return (
    <div className="bg-gradient-to-br from-white to-sky-100">
      <Navbar />
      <div className="flex pt-4 justify-center items-start">
        <form
          className="flex flex-col gap-4  px-24 font-salvatore"
          onSubmit={(e) => {
            setErrorMessage([]);
            handleSubmit(e);
          }}
        >
          {Object.keys(formData).map((key) => {
            const field = formData[key];
            if (key === 'essay') { return null }
            if (field.type !== 'checkbox') {
              return (
                <>
                  <label> {field.label} </label>
                  <input
                    className="border hover:border-2 transition-all duration-100 border-black rounded-lg bg-blue-200 w-96 px-2 py-2"
                    type={field.type}
                    placeholder={field.placeholder}
                    id={field.id}
                    name={field.name}
                    value={field.data}
                    onChange={handleChange}
                  />
                </>
              );
            }

          })}

          <label> {essayPrompt}</label>
          <textarea
            className="border hover:border-2 transition-all duration-100 border-black rounded-lg  w-3/4 h-80 px-2 py-2"
            id="essay"
            name="essay"
            value={formData.essay.data as any}
            onChange={handleChange}
            rows={6}
          />
          <label>
            <input
              type="checkbox"
              onChange={() => setAgeCheck(!ageCheck)}
            /> Check the box if you are 18+
          </label>

          {error && errorMessage.map((message, index) => <p className="text-red-500">{message}</p>)}


          <button className="border rounded-xl bg-blue-400 w-20 p-2 text-white" type="submit"> Submit</button>
        </form>
      </div>
    </div>

  )
}