package com.example.project_air

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.lifecycle.lifecycleScope
import com.google.firebase.FirebaseException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthUserCollisionException
import com.google.firebase.auth.FirebaseUser
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

class SignUpEmailInUseException() : Exception()
class SignInInvalidCredentialsException() : Exception()

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
  private var firebaseAuth: FirebaseAuth = FirebaseAuth.getInstance()

  suspend fun signUp(email: String, password: String): FirebaseUser? {
    return try {
      val result = firebaseAuth.createUserWithEmailAndPassword(email, password).await()

      result.user
    } catch (e: FirebaseAuthUserCollisionException) {
      throw SignUpEmailInUseException()
    } catch (e: Exception) {
      e.printStackTrace()
      null
    }
  }

  suspend fun signIn(email: String, password: String): FirebaseUser? {
    return try {
      val result = firebaseAuth.signInWithEmailAndPassword(email, password).await()

      result.user
    } catch (e: FirebaseException) {
      throw SignInInvalidCredentialsException()
    } catch (e: Exception) {
      println(e)
      // Handle other exceptions here
      null
    }
  }

  fun signOut() {
    firebaseAuth.signOut()
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {
      var currentUser by remember { mutableStateOf(firebaseAuth.currentUser) }

      var errors by remember { mutableStateOf("") }

      Column {
        if (currentUser != null) {
          Text(text = "UID: ${currentUser!!.uid}")
          Text(text = "email: ${currentUser!!.email}")
          Button(onClick = {
            signOut()
            currentUser = null
          }) {
            Text(text = "Sign Out")
          }
        }

        if (currentUser == null) {
          Button(onClick = {

            lifecycleScope.launch {
              try {
                errors = ""

                val user = signUp("hbt@email.com", "123456")

                if (user !== null) currentUser = user
              } catch (e: SignUpEmailInUseException) {
                errors = "Email already in use"
              }
            }
          }) {
            Text(text = "sign up")
          }

          Button(onClick = {
            lifecycleScope.launch {
              try {
                errors = ""

                val (email, password) = when ((0..1).random()) {
                  1 -> listOf("hbt@email.com", "123456")
                  else -> listOf("wrong@email.com", "786545")
                }

                println("$email and $password")

                val user = signIn(email, password)

                if (user !== null) currentUser = user
              } catch (e: SignInInvalidCredentialsException) {
                errors = "Invalid Email/Password"
              }
            }
          }) {
            Text(text = "sign in")
          }

          Text(text = errors)
        }
      }
    }
  }
}
