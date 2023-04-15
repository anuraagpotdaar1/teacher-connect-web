export interface FormValues {
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

  cno: string;
  emergency_cno: string;
  email: string;
  address: string;

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

  behaviour: string;

  institute_name_1: string;
  doj_1: string;
  dol_1: string;
  post_1: string;
  subject_1: string;
  starting_salary_1: string;
  ending_salary_1: string;
  remark_1: string;

  institute_name_2: string;
  doj_2: string;
  dol_2: string;
  post_2: string;
  subject_2: string;
  starting_salary_2: string;
  ending_salary_2: string;
  remark_2: string;

  institute_name_3: string;
  doj_3: string;
  dol_3: string;
  post_3: string;
  subject_3: string;
  starting_salary_3: string;
  ending_salary_3: string;
  remark_3: string;

}

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

  institute_name_1: '',
  doj_1: '',
  dol_1: '',
  post_1: '',
  subject_1: '',
  starting_salary_1: '',
  ending_salary_1: '',
  remark_1: '',

  institute_name_2: '',
  doj_2: '',
  dol_2: '',
  post_2: '',
  subject_2: '',
  starting_salary_2: '',
  ending_salary_2: '',
  remark_2: '',

  institute_name_3: '',
  doj_3: '',
  dol_3: '',
  post_3: '',
  subject_3: '',
  starting_salary_3: '',
  ending_salary_3: '',
  remark_3: '',
};
