package com.example.project_air.data.repository

import com.example.project_air.data.model.User
import com.example.project_air.data.repository.util.UserState
import com.example.project_air.data.util.Resource
import com.google.firebase.Firebase
import com.google.firebase.FirebaseException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.auth
import io.reactivex.rxjava3.core.Observable
import kotlinx.coroutines.tasks.await
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class FirebaseAuthRepository @Inject constructor() : AuthRepositoryInterface {
  private val firebaseAuth: FirebaseAuth = Firebase.auth

  override var user: Observable<UserState> = Observable.just(UserState.Loading())

  init {
    val currentUser = firebaseAuth.currentUser

    user = if (currentUser != null) {
      Observable.just(UserState.Success(User(currentUser.uid)))
    } else {
      Observable.just(UserState.UnAuthed())
    }
  }

  override suspend fun signIn(email: String, password: String): Resource<User> {
    return try {
      val result = firebaseAuth.signInWithEmailAndPassword(email, password).await()

      val newUser = User(result.user!!.uid)

      user = Observable.just(UserState.Success(newUser))

      Resource.Success(newUser)
    } catch (e: FirebaseException) {
      Resource.Error("Email/Senha Incorretos")
    } catch (e: Exception) {
      Resource.Error("Erro ao Logar, Tente Novamente")
    }
  }

  override suspend fun logout(): Resource<Unit> {
    return try {
      firebaseAuth.signOut()

      user = Observable.just(UserState.UnAuthed())

      Resource.Success(Unit)
    } catch (e: Exception) {
      Resource.Error("Erro ao deslogar")
    }
  }
}