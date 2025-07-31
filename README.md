# FaydaJustice – Digital Court & Legal Services Tracker

##  Contributors
- Rahel Shimels

##  Project Synopsis

###  Problem Statement
Ethiopia's legal and court systems are largely paper-based, leading to:
- Delayed case resolutions
- Citizens not knowing their case status
- No central dashboard for court administrators
- High potential for lost files, corruption, and inefficiencies

###  Planned Solution
FaydaJustice is a secure web-based platform that allows:
- **Citizens** to log in with their Fayda national ID (VeriFayda OIDC)
- **Court officials** to manage and view digital case records
- **All users** to track court dates, case types, progress, and outcomes
- A **central dashboard** with filters (region, court type, pending/resolved)
- **Criminal files will be securely attached to individuals with police records** to ensure traceability and prevent fraud
- **Deletion of criminal records without authorization is prevented** to maintain justice and accountability

We will simulate/mock legal case data for demo purposes in the hackathon.

###  Expected Outcome
- Reduce physical visits to court for updates
- Improve public trust and transparency
- Provide officials with data-driven insights
- Enable faster decision-making and better caseload management

###  Fayda's Role
- Fayda provides **secure and verified national ID login**
- Every user interaction is trusted and traceable via OIDC
- Fayda ensures **only verified citizens or court staff** access records

##  Tech Stack

| Component      | Technology |
|----------------|------------|
| Frontend       | React.js,Next.js 15,TypeScript, Tailwind CSS,CSS |
| Backend        | GO ( GOLANG) |
| Authentication | VeriFayda OIDC Integration |
| Database       | PostgreSQL  |
| Version Control| Git + GitHub |

##  Key Features
- Fayda-based secure login
- Dashboard with real-time court statistics
- Case tracking by region, type, and status
- Admin and Citizen views
- Files attached to verified individuals with police/criminal records
- Protection against unauthorized deletion of criminal files
- Privacy-respecting: Only mock/demo data used

##  Hackathon Notes
This project is developed for the **Fayda Hackathon 2025** and will be extended if selected for the in-person round.


