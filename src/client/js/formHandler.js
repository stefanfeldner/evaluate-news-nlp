import { text } from "body-parser";

async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("input").value;

  // if undefined, null or false (falsy values) throw error
  if (!formText) {
    showErrorInfo();
  }

  const postData = async (url = "", data = {}) => {
      console.log(data);
      const response = await fetch(url, {
          method: "POST",
          credentials: "same-origin",
          headers: {
              "Content-Type": "application/json",
          },
          // Body data type must match "Content-Type" header
          body: JSON.stringify(data),
      });

      try {
          const newData = await response.json();
          console.log(newData);
          return newData;
      } catch (error) {
          console.log("error", error);
      }
  };

  await postData("/form", { formText: formText });
  getData("/getData");
}

const showErrorInfo = () => {
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.classList.add('visible')
};

/*Function to GET data*/
const getData = async (url = "") => {
  try {
    const response = await fetch(url, {
        method: "GET",
    })
    const data = await response.json();
    console.log(data);

    updateUI(data.subjectivity, data.irony);
  } catch (err) {
    console.log("Error: " + err);
  }
};

const updateUI = (subjectivity, irony) => {
  const resultsContainer = document.getElementById('results_entry');
  const subjectivitySpan = document.getElementById('subjectivity');
  const ironySpan = document.getElementById('irony');

  resultsContainer.classList.add("visible");
  subjectivitySpan.textContent = subjectivity;
  ironySpan.textContent = irony;
};

export { handleSubmit, showErrorInfo, getData, updateUI };