'use strict';

let faker = require('faker');
let glob = require('glob').sync;
let uuid = require('uuid');
let readJson = require('jsonfile').readFileSync;
let writeJson = require('jsonfile').writeFileSync;

let rnd = (min, max) => Math.floor(Math.random() * (max - min) + min);
let range = max => Array(max).fill();
let rndItems = arr => range(rnd(2, 7)).map(i => faker.random.arrayElement(arr));
let rndToBe = () => rnd(0, 1) === 1;


let addresses = glob(`${__dirname}/../data/nycjobs*.json`)
  .map(fileName => {
    return readJson(fileName).value.map(job => ({
      work_location: job.work_location,
      geo_location: job.geo_location
    }))
  })
  .reduce((a, c) => a.concat(c));

let job = () => {

  let salaryFrom = rnd(40000, 60000);
  let salaryTo = rnd(salaryFrom, 80000);
  let address = faker.random.arrayElement(addresses);

  let agency = faker.random.arrayElement([
    'NurseWise',
    'Homecare',
    'Amedisys',
    'UW Hospitals & Clinics',
    'Community School',
    'CHS-Home Care'
  ]);

  let additionalInformation = faker.random.arrayElement([
    '',
    "Section 424-A of the New York Social Services Law requires an authorized agency to inquire whether a candidate for employment with child-caring responsibilities has been the subject of a child abuse and maltreatment report. The City of New York and the Administration for Childrenâ€™s Services are Equal Opportunity Employers Committed to Diversity",
    'N/A',
    "The license must be maintained during the  time of employment.     Additional note:   Must follow all safety, security, Blood-borne pathogen exposure, infection control, and hazardous materials policies and procedures to assure a safe environment for staff and students.  This includes using: personal protective wear, good hand hygiene, and adhering to sharps safety procedures.",
    "Candidates will be employees of DEP, but will report to NYC Parks at their assigned borough location. This posting is for a position that reports to the Bronx.    Appointments are subject to OMB approval. For additional information about DEP, visit   www.nyc.gov/dep.",
    "1.  This is a temporary assignment for a period not to exceed three months.    2.  Selected candidates will be required to travel throughout the five boroughs.",
    'This position requires a security background check and/or drug screening and participation in direct deposit. A background screening will be completed on each applicant selected for a position designated as "sensitive" and a drug test will be conducted on each applicant selected for positions designated as "safety sensitive" in accordance with department policies (Background Screening DOHP 60-5-08 and Drug Free Workplace DOHP 60-9-99).',
    'Applicants requiring a reasonable accommodation, as defined by the Americans with Disabilities Act, must notify the agency hiring authority and/or People First Service Center (1-877-562-7287). Notification to the hiring authority must be made in advance to allow sufficient time to provide the accommodation.'
  ]);


  let jobDesciption = '';
  jobDesciption += faker.random.arrayElement([
    'Do you love the thought of furthering your career of care in nursing but wish there was a way to better balance it with the rest of your life? If so, a Nurse position is a perfect career move for you! Company is a leader in providing cost-effective, quality care and award-winning health services that deliver positive, measurable results for our clients. When you join in the team, you become part of a caring family. You gain more than just job stability and individual opportunities for growth and advancement. Every day, you have many chances to help people in need regain their health.',
    'Oversees and coordinates medication management programs and resident emergency response plans in addition to staff and resident education.',
    'Raise the bar in your nursing career and join our REMARKABLE team of health care professionals who strive to provide exceptional care to residents and beyond. Your nursing expertise will contribute to our mission.',
    '',
    'Provide direct health services to individual students, parents/guardians and staff.  Participate in the planning, implementation and evaluation of the school health services program.',
    'Directs, initiates, and implements a patient care plan in a home care environment. Assists physicians during examinations and procedures. Prepares equipment, applies and changes dressings, and monitors patients. May administer prescribed medications. Relies on experience and judgment to plan and accomplish goals. Performs a variety of tasks. A certain degree of creativity and latitude is required. Typically reports to a manager or head of a unit/department.',
    'The purpose of this position is to assure professional health and educational on-site care for clients. Performs duties and responsibilities in a manner consistent with our mission, values, and Mercy service standards.',
    'This is an independent professional public health nursing work position Nursing Center for Families. The incumbent provides professional nursing to identify participants in the program in schools, homes, clinics and community settings. The Senior Community Health Nurse will provide case management services in any of the above location.  This case management includes: identification of needs/goals; assessment; counseling (including education); ensuring participant is able to access medical care and has a medical home; referral and follow up of client/family needs, concerns, goals and priorities in a holistic manner. Provides Immunizations for School Initiative and Back to School events. Provides Immunizations for children, School Initiative and Back –to- School events.  Provides vaccines in the community and in the NCF and is responsible for vaccine storage and handling accountability for the NCF site to include the amount of vaccine ordered, shipped, received, used, and on hand; monitoring data logger temperatures, uploading data into Florida Shots, and daily review of physical inventory, HMS Service Report and Vaccine Utilization Report.',
    'Coordinates the evaluation/admission and/or transfer process of patients to the home care agency.',
    'Assist patients in the process of navigating post-acute care.'
  ])

  if (rndToBe()) {
    jobDesciption += "\nBenfits:\n"
    jobDesciption += rndItems([
      '5,000 sign on bonus',
      ' 401 (K) plan, available to all employees, matching contribution on discretionary basis',
      'Employee Stock Purchase Plan available, to all employees,  with employee discount',
      '3 health plan options, dental, vision insurance',
      'Paid time off and paid holidays',
      'Employee Assistance Program',
      'Tuition Reimbursement Program',
      'Other benefits include:   Life insurance, supplemental life insurance for dependents, short and long-term disability, critical illness, accident insurance',
      ''
    ]).join('\n\t');

    jobDesciption += "\n\n"
  }

  jobDesciption += "\Responsibilities:\n"
  jobDesciption += rndItems([
    'Triage phone calls as directed.',
    'Assists with procedures and performs tests as directed by physician or nurse practitioner.',
    'Administers medications and treatments.',
    'Documents all visits, telephone encounters, procedures, medications, and education in Epic accurately and in timely manner.',
    'Provides patient education as needed.',
    'Calls patients with lab test results and calls pharmacy. Ensure appropriate communication, including scheduling appointments, tests, ordering and documenting prescriptions, processing and documenting messages.',
    'Maintains supplies and medications appropriately.',
    'Coordinate DME/Home Health referrals and authorizations.',
    'Receives and documents patient referrals to home care services, insuring compliance with applicable coverage criteria.',
    'Coordinates the evaluation/admission process and assigns qualified personnel to service patients admitted to the agency.',
    'Communicates pertinent patient information to the patient’s physician, payor source and/or appropriate agency staff.',
    'Makes referrals to agency staff and other community resources as appropriate.',
    'Obtains verbal orders on all patients being referred and documents orders on appropriate referral intake documents.',
    'Coordinates with Admissions department for insurance verification and authorization',
    'Keeps abreast of nursing trends and knowledge.',
    'Assist patients in the process of navigating post-acute care.',
    'Assess, plan, implement, coordinate, monitor, and evaluate options and services with a primary goal of providing a safe transition from acute care to home for home health or hospice services.',
    'Integrate evidence-based clinical guidelines, preventative guidelines, protocols in development of transition plans that are patient-centered, promoting quality and efficiency in the delivery of post-acute care.',
    'Promote adherence to post-acute plans and ensure ordered services are completed.',
    'Represent Encompass in transitional care activities and strategic relationships with health systems, hospitals, inpatient facilities, and physician groups.',
    'Monitor execution of transitional care services through ongoing quality assurance visits with referral sources.'
  ]).join('\n\t');

  let minimumRequirements = rndItems([
    'Graduate of Diploma or Associate Degree Program in Nursing; Bachelor of Science degree in Nursing preferred.',
    'Licensed to practice in MA.',
    'Minimum 2 years nursing experience required.',
    'Current and unencumbered license to practice as a Registered Nurse specific to that state the employee is assigned to work by the Company.',
    ' Nurse Licensure Compact (NLC) documents the following: The mutual recognition model of nurse licensure allows a nurse to have one license (in his or her state of residency) and to practice in other states (both physical and electronic), subject to each state’s practice law and regulation. Nurses must legally reside in a NLC state to be eligible to have a multi-state license. See list of Nurse Licensure Compact States (NLC)',
    'Bachelor’s degree in nursing with one year recent nursing experience in an active treatment unit in a psychiatric or mental health hospital or outpatient clinic',
    'Diploma or associate’s degree with two years recent nursing experience in an active treatment unit in a psychiatric or mental health hospital or outpatient clinic.',
    'CPR required',
    ' Must have good verbal and written communication skills and evaluation techniques and demonstrate knowledge of clinical skills, judgment, current nursing practices and analytical capabilities.',
    'Must have a current driver’s license, agency-required automobile liability insurance, and availability of personal, dependable transportation to conduct home visits.',
    'Able to assess patient status and identify requirements relative to age specific needs.',
    'Must be willing to work Saturday, Sunday Monday and oneof the following: Friday or Tuesday.',
    'Minimum of one (1) year of experience as a registered nurse.',
    'Minimum of one (1) year relevant clinical RN experience',
    'Registration as a professional nurse in the State of New York',
    'Current IV Therapy skills, with knowledge of venous access devices and ambulatory pumps.',
    'Knowledge regarding quality improvement and home health standards of care.',
    'Experience in teaching both patient and families self-care skills.',
    'Knowledge regarding the impact of acute and chronic illness on the lives of patients and families in the community',
    'Functions with a high degree of independence.',
    'Collaborates with other disciplines to provide care.',
    'Has excellent interpersonal and group process skills.',
    'Ability to lift up to 50 pounds maximum with frequent lifting/and or carrying objects weighing up to 25 pounds.',
    'Graduate certificate from an accredited nursing program.',
    '3+ years combined experience in critical care, pediatric, obstetrics, home health, school nursing, or emergency nursing.',
    'Current RN license without restriction in California, Florida, and at least one Compact State (preferably Arizona or Texas).',
    'Requires an associate’s degree and is certified as a registered nurse.',
    'High School Diploma or GED.  Graduate from an accredited RN program.',
    'B.A.T. Certified preferred.',
    'Ability to be flexible.',
    'Knowledge of health- general personal health prevention, promotion, and management.',
  ]).join('\n\t');

  let preferredSkills = rndItems([
    'Experience in homecare, assisted living or long-term care environment preferred.',
    'Minimum 1 year of management experience preferred.',
    'Excellent customer service skills',
    'Must be familiar with Medicare, Medicaid, and other third-party payor guidelines.',
    'Must be familiar with general use and functions of the computer, such as, user names and password concepts; internet; e-mail; navigation of computer desktop, including starting programs, using files, and windows, effectively use navigation buttons and tool bars; ability to self-manage online HR services and online training programs.',
    'Recent, relevant experience in a Medicare-certified home health agency as a case-manager, primary nurse, or BSN student',
    'Familiarity and work experience using home health software documentation applications such as Delta Encore.',
    '5 years experience strongly preferred.',
    'Bi-lingual Spanish strongly preferred.',
    'Urine drug screen collection certified preferred.',
    'Certified by the American College of Occupational Health Nurses preferred.',
    'RN licensure in Illinois preferred.',
    'Ability to plan, organize, and coordinate work assignments.',
    'Ability to work effectively with others.',
    'Nurse Licensure Compact (NLC) documents the following: The mutual recognition model of nurse licensure allows a nurse to have one license (in his or her state of residency) and to practice in other states (both physical and electronic), subject to each state’s practice law and regulation. Nurses must legally reside in a NLC state to be eligible to have a multi-state license.'
  ]).join('\n\t');

  return {
    id: uuid.v4(),
    job_id: `${rnd(1300, 5000)}`,
    agency: agency,
    posting_type: faker.random.arrayElement(['Internal', 'External']),
    num_of_positions: rnd(1, 5),
    business_title: faker.random.arrayElement([
      'Staff Nurse',
      'Registered Nurse',
      'Assessment Nurse',
      'Wellness Nurse',
      'Psychiatric Registered Nurse',
      'Wrap Around/Wellness Nurse',
      'Senior Comunity Health Nurse',
      'Intake Coordinator/ Home Health',

    ]),
    //civil_service_title: "INSPECTOR (PLUMBING)",
    //title_code_no: "1002A",
    level: faker.random.arrayElement(['00', '01', '02', 'M1', 'M2', 'M5', 'M7']),
    salary_range_from: salaryFrom,
    salary_range_to: salaryTo,
    salary_frequency: 'Annual', //Hourly
    work_location: address.work_location,
    //"division_work_unit": "Mis Admin,Network Sysms Dvlpmt",
    job_description: jobDesciption,
    minimum_qual_requirements: minimumRequirements,
    preferred_skills: preferredSkills,
    additional_information: additionalInformation,
    to_apply: "Click the ''Apply Now'' button.",
    hours_per_shift: "",
    recruitment_contact: "",
    residency_requirement: "New York City residency is generally required within 90 days of appointment. However, City Employees in certain titles who have worked for the City for 2 continuous years may also be eligible to reside in Nassau, Suffolk, Putnam, Westchester, Rockland, or Orange County. To determine if the residency requirement applies to you, please discuss with the agency representative at the time of interview.",
    posting_date: faker.date.between("2013-11-01", Date()),
    post_until: "1900-01-01T01:00:00+00:00",
    posting_updated: faker.date.between("2013-11-01", Date()),
    process_date: faker.date.between("2013-11-01", Date()),
    geo_location: address.geo_location,
    tags: [ ]
  }
};

for(let i = 1; i <= 3; i++) {
  writeJson(`data/nurs${i}.json`, {
    value: range(500).map(() => job())
  });
}
