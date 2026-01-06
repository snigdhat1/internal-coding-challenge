Your job is to write a script that performs three tasks (order does not matter):

1) Fill all PDFs with all people’s data

Output: All generated PDFs should go in the pdfs folder.
File naming: Use the form title. Example: For Acord 1, output as pdfs/Acord 1.pdf.


 - go through list of employees
  - forms to fill (3) - check if forms to fill is empty (continue) or not empty 
    - within each form - you get the eid -> call graphql query -> get name
      - filllPDF API -> fill the pdf using name from graphql query 

    - check if the name that you get back is USPS 1583 

return out of that funcvion

2) Fill only USPS 1583

Output: Place the result in pdfs as well.

- for loop check if you have the same eid fill otu that form as well


3)File naming: Use the EID. Example: pdfs/<eid>.pdf.
Sort all forms by prevalence

- dictionary = {"eid": occurences}

Output format:

{
  "eid": <number of references>,
  "anotherEid": <number of references>
}