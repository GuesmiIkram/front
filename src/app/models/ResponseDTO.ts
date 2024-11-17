export class ResponseDTO {
    idResponse?: number;
    idPublication?: number;
    idClient?: number;
    idProprietaire?: number;
    responsecontenu?: string;
    publicationContenu?: string;
    nom_prop?: string;  // Utilisez 'string' au lieu de 'String'
    email_prop?: string;  // Utilisez 'string' au lieu de 'String'
    tel_prop?: string;  // Utilisez 'string' au lieu de 'String'
  }