# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

- #### Step 2: Use an LLM to help expand your perspective.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 
    
User Story:
As a user of this CSV parser, I am only able to parse data if there is a header row and subsequent rows of data without any blank rows in between - if the csv is empty then there shouldn’t be any parsing done and I should be notified via an error (functionality, I came up with this and LLM seconded it). 

Acceptance Criteria:
The parser throws an error if the CSV is blank, or if there is only a header row
The parser throws an error if there are blank lines in the CSV
When an error is thrown, a message is displayed stating that there is an error parsing row

User Story:
As the user I am notified via an error if the datatype for a column is inconsistent with the rest of the datatypes, and my parser will fail to parse past this error (extensibility, both me and the LLM agree with these two data handling features.)

Acceptance Criteria:
The parser throws an error if there is a datatype of the wrong type in a column of the CSV
When an error is thrown, a message is displayed stating that there is an error parsing row

User Story:
Additionally, as the user of this parser I am notified via an error if a row has more fields than the other rows (extensibility, both me and the LLM agree with these two data handling features)

Acceptance Criteria:
The parser throws an error if there is a row with too many values
When an error is thrown, a message is displayed stating that there is an error parsing row

User Story:
Finally, my parser is functional regardless of whether the delimiters are commas or another character like a semicolon (functionality, I came up with this and LLM also suggested it.)

Acceptance Criteria:
Even if the values are separated by other characters, such as semicolons or colons, the parser is able to parse each row without error

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    To vary my prompts, I first just asked for edge cases I should test for when creating a csv parser, which was a super short prompt and yielded a solid list of edge cases grouped by categories, such as structural, data type, and field content. In my next prompt I got a very long list of enhancements and edge cases, which I was content with but some of which I had already thought of. So, I refined my prompt by including ideas that I had already come up with and asking for enhancements that I hadn’t already listed.  Consequently, the results were more creative and included less obvious ideas that I honestly never would have thought of, like a feature that reports exact line numbers that caused an error. Also, depending on my prompt, copilot grouped the suggestions by different titles - for the same suggestion of testing for different datatypes in a column, one session called the category “field content edge cases” and another session, “smart data handling.” 

### Design Choices

To satisfy all the requirements, I decided to have my parser accept a ZodSchema of any type, but made that extra argument optional (via the ? in the method header) so that I could also ensure that the parser just created a 2D string array if an undefined (or nothing at all) was passed instead of a schema. From there, my method split into two scenarios: with or without a schema. Without basically involved rote transcription of each line of the CSV into an array of strings, while with involved passing in that string array to the schema, which I needed to convert the arrays into actual objects. Within my schemas, I utilized the coerce method for numbers to manipulate string versions of numbers to become actual numbers. I also wrote a helper method when coercing booleans that in essence rejecting any value that wasn’t either true or false, because the coerce boolean method was being faulty.

### 1340 Supplement --All my answers are in a separate pdf!

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): Used copilot, link to prompts here: https://docs.google.com/document/d/1Z2cfTr2si2KPRCylLTHInCDs2KrloMZZBXQP96BogQY/edit?usp=sharing

#### Total estimated time it took to complete project: 8 hrs
#### Link to GitHub Repo:  
