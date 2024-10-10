import { inject, Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, DocumentReference, getDoc, setDoc, updateDoc, query, orderBy} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore: Firestore = inject(Firestore);

  constructor() { }


  getDocument<tipo>(enlace: string) {
    const document = doc(this.firestore, enlace) as DocumentReference<tipo, any>;
    return getDoc<tipo, any>(document)
  }

  getDocumentChanges<tipo>(enlace: string) {
    console.log('getDocumentChanges -> ', enlace);
    const document = doc(this.firestore, enlace);
    return docData(document) as Observable<tipo>;
  }

  getCollectionChanges<tipo>(path: string, orderField?: string): Observable<(tipo & { id: string })[]> {
    const itemCollection = collection(this.firestore, path);
  
    // Create a query that orders the results if an orderField is provided
    const collectionQuery = orderField ? query(itemCollection, orderBy(orderField)) : itemCollection;
  
    return collectionData(collectionQuery, { idField: 'id' }) as Observable<(tipo & { id: string })[]>;
  }

  createDocument(data: any, enlace: string) {
    const document = doc(this.firestore, enlace);
    return setDoc(document, data);
  }

  createDocumentID(data: any, enlace: string, idDoc: string) {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return setDoc(document, data);
  }


  async updateDocumentID(data: any, enlace: string, idDoc: string) {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return updateDoc(document, data)
  }

  async updateDocument(data: any, enlace: string) {
    const document = doc(this.firestore, enlace);
    return updateDoc(document, data)
  }

  deleteDocumentID(enlace: string, idDoc: string) {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return deleteDoc(document);
  }

  deleteDocFromRef(ref: any) {
    return deleteDoc(ref)
  }

  createIdDoc() {
    return uuidv4()
  }

}
