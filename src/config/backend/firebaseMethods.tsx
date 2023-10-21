import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// imports from database
// imports from database
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { app } from "./firebaseConfig";

const auth = getAuth(app);
const db = getDatabase(app)

// firebase signup method

export let FBsignUp = (body: any, nodeName: any) => {
    return new Promise<any>((resolve, reject) => {
        if (!body.Email || !body.Password) {
            reject("please enter Email or Password")
        } else {
            createUserWithEmailAndPassword(auth, body.Email, body.Password)
                .then(res => {
                    let id = res.user.uid
                    body.id = id
                    const referece = ref(db, `${nodeName}/${id}`)
                    set(referece, body)
                        .then(user => {
                            resolve(user)
                        })
                        .catch(errs => {
                            reject(errs)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
        }
    })
}

// firebase login method

export let FBlogin = (body: any, nodeName: any) => {
    return new Promise<any>((resolve, reject) => {
        if (!body.Email || !body.Password) {
            reject("please enter Email or Password")
        } else {
            signInWithEmailAndPassword(auth, body.Email, body.Password)
                .then(res => {
                    let id = res.user.uid
                    body.id = id
                    const referece = ref(db, `${nodeName}/${id}`)
                    onValue(referece, (data) => {
                        if (data.exists()) {
                            resolve(data.val())
                        } else {
                            reject("No Data Found")
                        }
                    })

                }).catch(err => {
                    reject(err)
                })
        }
    })
}

export let FBadd = (nodeNames: any, body: any, id?: any) => {
    return new Promise<any>((resolve, reject) => {
        const TaskID = push(ref(db, `${nodeNames}/`)).key
        body.id = TaskID
        const reference = ref(db, `${nodeNames}/${body.id}`)
        set(reference, body).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export let FBget = (nodeName: any) => {
    return new Promise<any>((resolve, reject) => {
        const reference = ref(db, `${nodeName}`)
        onValue(reference, (data) => {
            if (data.exists()) {
                resolve(Object.values(data.val()))
                console.log(Object.values(data.val()))
            } else {
                reject("No Data Found")
            }
        })
    })
}