import firebase from "../firebase.js";
import {
  getFirestore,
  addDoc,
  getDocs,
  getDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Product from "../models/Product.js";

const db = getFirestore(firebase);

export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const saveDoc = await addDoc(collection(db, "products"), data);
    res.status(200).json({
      code: 200,
      status: true,
      data: saveDoc.data
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      status: false,
    });
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await getDocs(collection(db, "products"));
    const productArray = [];

    products.forEach((doc) => {
      const product = new Product(
        doc.id,
        doc.data().name,
        doc.data().price,
        doc.data().retailer,
        doc.data().amountInStock
      );

      productArray.push(product);
    });

    res.status(200).json({
      code: 200,
      status: true,
      data: productArray,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      status: false,
    });
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = doc(db, "products", id);
    const data = await getDoc(product);

    if (data.exists()) {
      res.status(200).json({
        code: 200,
        status: true,
        data: data.data(),
      });
    } else {
      res.status(404).json({
        code: 404,
        status: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      status: false,
    });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const product = doc(db, 'products', id)
    await updateDoc(product, data)

    res.status(200).json({
      code: 200,
      status: true,
      message: 'product updated successfully'
    })
  } catch(error) {
    res.status(400).json({
      code: 400,
      status: false
    })
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    await deleteDoc(doc(db, 'products', id))

    res.status(201).json({
      code: 201,
      status: true,
      message: 'product deleted successfully'
    })
  } catch(error) {
    res.status(400).json({
      code: 400,
      status: false
    })
  }
}