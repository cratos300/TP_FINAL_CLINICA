import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CargarhoraespecialistaService {

  private dbPath = '/cargarhoraespecialista';

  MensajesRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) { 
    this.MensajesRef = db.collection(this.dbPath);
  }
  getAll(): AngularFirestoreCollection<any> {
    this.MensajesRef = this.db.collection(this.dbPath);
    return this.MensajesRef;
  }

  create(mensajes: any): any {
    console.log(mensajes); 
    this.MensajesRef = this.db.collection(this.dbPath);
    return this.MensajesRef.add({...mensajes});
  }
 
  update(id: string, data: any): Promise<void> {
    this.MensajesRef = this.db.collection(this.dbPath);
    return this.MensajesRef.doc(id).update({
      dias: data.dias,
      email: data.email,
      especialidad: data.especialidad,
      hora: data.hora,
      imagen: data.imagen,
      nombre: data.nombre

    });
  }

  delete(id: string): Promise<void> {
    this.MensajesRef = this.db.collection(this.dbPath);
    return this.MensajesRef.doc(id).delete();
  }
}
