const numOfInstitutes = 3;

type InstituteProperties = {
  [key: string]: string;
};

const generateInstituteProperties = (numOfInstitutes: number): InstituteProperties => {
  let properties: InstituteProperties = {};

  for (let i = 1; i <= numOfInstitutes; i++) {
    properties[`institute_name_${i}`] = '';
    properties[`doj_${i}`] = '';
    properties[`dol_${i}`] = '';
    properties[`post_${i}`] = '';
    properties[`subject_${i}`] = '';
    properties[`starting_salary_${i}`] = '';
    properties[`ending_salary_${i}`] = '';
    properties[`remark_${i}`] = '';
  }

  return properties;
};

export type PersonalDetailsValues = {
  f_name: string;
  m_name: string;
  surname: string;
  dob: string;
  pob: string;
  blood_group: string;
  religion: string;
  caste: string;
  gender: string;
  disability: string;
  marital_status: string;
  id_mark: string;
  behaviour: string;
};

export type ContactDetailsValues = {
  cno: string;
  emergency_cno: string;
  email: string;
  address: string;
};

export type EducationalDetailsValues = {
  tenth_per: string;
  tenth_board: string;
  twelfth_per: string;
  twelfth_board: string;
  ug_per: string;
  ug_field: string;
  ug_uni: string;
  grad_per: string;
  grad_uni: string;
  grad_field: string;
};

export type DynamicInstituteFormValues = {
  [P in keyof ReturnType<typeof generateInstituteProperties>]: string;
};

export type FormValues = PersonalDetailsValues & ContactDetailsValues & EducationalDetailsValues & DynamicInstituteFormValues;

export const initialValues: FormValues = {
  f_name: '',
  m_name: '',
  surname: '',
  dob: '',
  pob: '',
  blood_group: '',
  religion: '',
  caste: '',
  gender: '',
  disability: '',
  marital_status: '',
  id_mark: '',

  cno: '',
  emergency_cno: '',
  email: '',
  address: '',

  tenth_per: '',
  tenth_board: '',
  twelfth_per: '',
  twelfth_board: '',
  ug_per: '',
  ug_uni: '',
  ug_field: '',
  grad_per: '',
  grad_field: '',
  grad_uni: '',

  behaviour: '',

  // Use the spread operator to add the generated properties to the initialValues object
  ...generateInstituteProperties(numOfInstitutes),
};