"use client";

import {

  useEffect,

  useState,

} from "react";



import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";



interface Expense {

  id: number;

  title: string;

  category: string;

  amount: number;

  description?: string;

  expenseDate: string;

}



export default function ExpensesPage() {

  const [expenses, setExpenses] =
    useState<Expense[]>([]);



  const [editingId, setEditingId] =
    useState<number | null>(
      null
    );



  const [formData, setFormData] =
    useState({

      title: "",

      category: "",

      amount: "",

      description: "",

      expenseDate: "",

    });



  /* FETCH EXPENSES */

  const fetchExpenses =
    async () => {

      const response =
        await fetch(

          "/api/expenses"

        );



      const data =
        await response.json();



      setExpenses(data);

    };



  useEffect(() => {

    fetchExpenses();

  }, []);



  /* SUBMIT */

  const handleSubmit =
    async (

      e: React.FormEvent

    ) => {

      e.preventDefault();



      const url =
        editingId

          ? `/api/expenses/${editingId}`

          : "/api/expenses";



      const method =
        editingId

          ? "PUT"

          : "POST";



      await fetch(url, {

        method,



        headers: {

          "Content-Type":
            "application/json",

        },



        body: JSON.stringify(
          formData
        ),

      });



      setFormData({

        title: "",

        category: "",

        amount: "",

        description: "",

        expenseDate: "",

      });



      setEditingId(null);



      fetchExpenses();

    };



  /* DELETE */

  const deleteExpense =
    async (id: number) => {

      const confirmDelete =
        confirm(

          "Delete this expense?"

        );



      if (!confirmDelete)
        return;



      await fetch(

        `/api/expenses/${id}`,

        {

          method: "DELETE",

        }

      );



      fetchExpenses();

    };



  /* EDIT */

  const editExpense =
    (expense: Expense) => {

      setEditingId(
        expense.id
      );



      setFormData({

        title:
          expense.title,



        category:
          expense.category,



        amount:
          String(
            expense.amount
          ),



        description:
          expense.description ||
          "",



        expenseDate:
          expense.expenseDate
            .split("T")[0],

      });

    };



  return (

    <div className="flex">

      <Sidebar />



      <main className="body-sidebar flex-1 p-6 transition-all duration-300">

        <Navbar />



        <div className="space-y-8">

          {/* HEADER */}

          <div>

            <h1 className="text-5xl font-bold text-gray-900">

              Expense Management

            </h1>



            <p className="text-gray-500 mt-3 text-lg">

              Track institution expenses

            </p>

          </div>



          {/* FORM */}

          <form

            onSubmit={handleSubmit}

            className="bg-white rounded-3xl shadow-sm p-8 grid lg:grid-cols-2 gap-6"
          >

            {/* TITLE */}

            <input

              type="text"

              placeholder="Expense Title"

              value={formData.title}

              onChange={(e) =>

                setFormData({

                  ...formData,

                  title:
                    e.target.value,

                })
              }

              className="border p-4 rounded-2xl"

              required
            />



            {/* CATEGORY */}

            <select

              value={
                formData.category
              }

              onChange={(e) =>

                setFormData({

                  ...formData,

                  category:
                    e.target.value,

                })
              }

              className="border p-4 rounded-2xl"

              required
            >

              <option value="">

                Select Category

              </option>



              <option value="Salary">

                Salary

              </option>



              <option value="Electricity">

                Electricity

              </option>



              <option value="Internet">

                Internet

              </option>



              <option value="Maintenance">

                Maintenance

              </option>



              <option value="Furniture">

                Furniture

              </option>



              <option value="Transport">

                Transport

              </option>



              <option value="Marketing">

                Marketing

              </option>



              <option value="Misc">

                Misc

              </option>

            </select>



            {/* AMOUNT */}

            <input

              type="number"

              placeholder="Amount"

              value={
                formData.amount
              }

              onChange={(e) =>

                setFormData({

                  ...formData,

                  amount:
                    e.target.value,

                })
              }

              className="border p-4 rounded-2xl"

              required
            />



            {/* DATE */}

            <input

              type="date"

              value={
                formData.expenseDate
              }

              onChange={(e) =>

                setFormData({

                  ...formData,

                  expenseDate:
                    e.target.value,

                })
              }

              className="border p-4 rounded-2xl"

              required
            />



            {/* DESCRIPTION */}

            <textarea

              placeholder="Description"

              value={
                formData.description
              }

              onChange={(e) =>

                setFormData({

                  ...formData,

                  description:
                    e.target.value,

                })
              }

              className="border p-4 rounded-2xl lg:col-span-2"
            />



            {/* SUBMIT BUTTON */}

            <button

              type="submit"

              className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold lg:col-span-2"
            >

              {

                editingId

                  ? "Update Expense"

                  : "Add Expense"

              }

            </button>

          </form>



          {/* FILTERS */}

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <div className="flex flex-wrap gap-4">

              <input

                type="date"

                className="border p-3 rounded-xl"
              />



              <input

                type="date"

                className="border p-3 rounded-xl"
              />



              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl">

                Filter

              </button>

            </div>

          </div>



          {/* TABLE */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-3xl font-bold mb-6">

              Expense Records

            </h2>



            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-4 text-left">

                      Date

                    </th>



                    <th className="p-4 text-left">

                      Title

                    </th>



                    <th className="p-4 text-left">

                      Category

                    </th>



                    <th className="p-4 text-left">

                      Amount

                    </th>



                    <th className="p-4 text-left">

                      Actions

                    </th>

                  </tr>

                </thead>



                <tbody>

                  {expenses.map(

                    (expense) => (

                      <tr

                        key={expense.id}

                        className="border-b"
                      >

                        {/* DATE */}

                        <td className="p-4">

                          {

                            new Date(

                              expense.expenseDate

                            ).toLocaleDateString()

                          }

                        </td>



                        {/* TITLE */}

                        <td className="p-4 font-semibold">

                          {

                            expense.title

                          }

                        </td>



                        {/* CATEGORY */}

                        <td className="p-4">

                          {

                            expense.category

                          }

                        </td>



                        {/* AMOUNT */}

                        <td className="p-4 text-red-600 font-bold">

                          ₹

                          {

                            expense.amount

                          }

                        </td>



                        {/* ACTIONS */}

                        <td className="p-4 flex gap-3">

                          {/* EDIT */}

                          <button

  type="button"

  onClick={() =>

    editExpense(
      expense
    )
  }

  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
>

  Edit

</button>



                          {/* DELETE */}

                          <button

                            onClick={() =>

                              deleteExpense(
                                expense.id
                              )
                            }

                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
                          >

                            Delete

                          </button>

                        </td>

                      </tr>

                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}