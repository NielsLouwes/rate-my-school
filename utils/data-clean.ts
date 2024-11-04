import schools from "~/data/schools.json";

export const filteredData = () =>
  schools.map((school) => {
    return {
      schoolname: school.INSTELLINGSNAAM,
      schooltype: school["SOORT HO"],
      province: school.PROVINCIE,
      streetName: school.STRAATNAAM,
      houseNumber: school["HUISNUMMER-TOEVOEGING"],
      postalCode: school.POSTCODE,
      city: school.PLAATSNAAM,
      website: school.INTERNETADRES,
      uniqueId: school["BEVOEGD GEZAG NUMMER"],
    };
  });

export const schoolNames = () => {
  return schools.map((school) => {
    return school.INSTELLINGSNAAM;
  });
};
