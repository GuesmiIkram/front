export class Voiture {
    id?: number; // Matches Long in Java
    matricule!: string; // Matches String in Java
    marque!: string; // Matches String in Java
    modele!: string; // Matches String in Java
    annee!: number; // Matches Integer in Java
    couleur!: string; // Matches String in Java
    prix!: number; // Change to number to match BigDecimal in Java; consider using `BigDecimal` in TypeScript if required.
    description!: string; // Matches String in Java
    etat!: string; // Added to match the new field in the Java model
    nombrePortes!: number; // Matches Integer in Java
    airConditionne!: boolean; // Matches Boolean in Java
    typeCarburant!: string; // Matches String in Java
    boiteVitesse!: string; // Matches String in Java
    nombreChevaux!: number; // Added to match the new field in the Java model
    nombrePassagers!: number; // Matches Integer in Java
    prixParJour!: number; // Added to match the new field in the Java model
    montantCaution!: number; // Matches BigDecimal in Java; consider using `BigDecimal` in TypeScript if required.
    proprietaireId?: number;
    imageFile?: File;
    imagePath?: string;
    dateDebutDisponibilite!: Date;
    dateFinDisponibilite!: Date;
    
    // Assuming you want to link to the Proprietaire entity, replace with appropriate type if needed
}
