/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    serverTimestamp,
    Timestamp,
    updateDoc,
    where,
} from "firebase/firestore";

const db = getFirestore();
const TODOS_COLLECTION = "todos";

export interface Todo {
    id: string;
    title: string;
    description: string;
    status: "pending" | "completed";
    created_at: Timestamp | null;
    creator_email: string;
}

export async function getTodos(
    creatorEmail: string,
    props: any = {
        sort: "created_at",
        order: "desc",
    }
): Promise<Todo[]> {
    const { sort = "created_at", order = "desc" } = props;
    const q = query(
        collection(db, TODOS_COLLECTION),
        where("creator_email", "==", creatorEmail),
        orderBy(sort, order)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Todo));
}

export async function addTodo(
    todo: Omit<Todo, "id" | "created_at">
): Promise<string> {
    const docRef = await addDoc(collection(db, TODOS_COLLECTION), {
        ...todo,
        created_at: serverTimestamp(),
    });
    return docRef.id;
}

export async function updateTodo(
    id: string,
    data: Partial<Omit<Todo, "id" | "created_at">>
) {
    const docRef = doc(db, TODOS_COLLECTION, id);
    await updateDoc(docRef, data);
}

export async function deleteTodo(id: string) {
    const docRef = doc(db, TODOS_COLLECTION, id);
    await deleteDoc(docRef);
}
