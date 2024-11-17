import { Disponibilite } from "./Disponibilite";

export class Voiture {
    id?: number;
    matricule!: string;
    marque!: string;
    modele!: string;
    annee!: number;
    couleur!: string;
    prix!: number;
    description!: string;
    etat!: string;
    nombrePortes!: number;
    airConditionne!: boolean;
    typeCarburant!: string;
    boiteVitesse!: string;
    nombreChevaux!: number;
    nombrePassagers!: number;
    prixParJour!: number;
    montantCaution!: number;
    proprietaireId?: number;
    imageFile?: File;
    imagePath?: string;
    
    disponibilites: Disponibilite[] = [];  // Ajout du tableau des disponibilités
}
 