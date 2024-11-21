export class Reservation {
    constructor(
        public id: number, 
        public voitureId: number,
        public proprietaireId: number,
        public clientId: number,
        public dateDebut: string,
        public dateFin: string,
        public montantTotal: number,
        public montantPaye: number
    ) {}
}
