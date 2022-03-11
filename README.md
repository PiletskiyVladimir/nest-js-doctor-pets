Test project technical task

1. Project entities:
   1. User ✓
   2. Doctor ✓
   3. Pet ✓
   4. Clinic ✓
   5. DoctorPet ✓
   6. DoctorClinic ✓
   7. Report ✓
   8. Session ✓

2. Project connections
   1. User (hasMany) 1:M Session
   2. User (hasOne) 1:1 Doctor
   3. User (hasMany) 1:M Pet
   4. Doctor (belongsToMany) M:M Pet (belongsToMany) ✓
   5. Doctor (belongsToMany) M:M Clinic (belongsToMany) ✓
   6. Doctor 1:M Report ✓
   7. Pet 1:M Report ✓