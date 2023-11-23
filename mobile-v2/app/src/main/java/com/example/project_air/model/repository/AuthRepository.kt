package com.example.project_air.model.repository

import com.example.project_air.model.domain.User
import com.example.project_air.viewmodel.auth.SignInInvalidCredentialsException
import com.example.project_air.viewmodel.auth.SignUpEmailInUseException
import com.google.firebase.FirebaseException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthUserCollisionException
import com.google.firebase.auth.FirebaseUser
import kotlinx.coroutines.tasks.await
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthRepository @Inject constructor() {
  var user: User? = null

  private var firebaseAuth: FirebaseAuth = FirebaseAuth.getInstance()

  suspend fun signIn(email: String, password: String) {
    val _user = try {
      val result = firebaseAuth.signInWithEmailAndPassword(email, password).await()

      result.user
    } catch (e: FirebaseException) {
      throw SignInInvalidCredentialsException()
    } catch (e: Exception) {
      println(e)
      // Handle other exceptions here
      null
    }

    if (_user != null) {
      user = User(_user.uid)
    }
  }

  fun signOut() {
    firebaseAuth.signOut()
    user = null
  }

  /*suspend fun signUp(email: String, password: String) {
  val _user = try {
   val result = firebaseAuth.createUserWithEmailAndPassword(email, password).await()

   result.user
 } catch (e: FirebaseAuthUserCollisionException) {
   throw SignUpEmailInUseException()
 } catch (e: Exception) {
   e.printStackTrace()
   null
 }

 if (_user != null) {
   user = User(_user.uid)
 }
}*/
}