package com.example.project_air.viewmodel.auth

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.project_air.data.repository.AuthRepositoryInterface
import com.example.project_air.data.repository.util.UserState
import com.example.project_air.data.util.Resource
import com.example.project_air.view.util.Route
import com.example.project_air.view.util.UIEvent
import dagger.hilt.android.lifecycle.HiltViewModel
import io.reactivex.rxjava3.disposables.CompositeDisposable
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthViewModel @Inject constructor(
  private val authRepository: AuthRepositoryInterface
) : ViewModel() {
  private val _eventFlow = MutableSharedFlow<UIEvent>()
  val eventFlow = _eventFlow.asSharedFlow()

  private val _user: MutableState<UserState> = mutableStateOf(UserState.Loading())
  val user: State<UserState> = _user

  private val _errors = mutableStateOf("")
  val errors: State<String> = _errors

  private val _email = mutableStateOf("")
  val email: State<String> = _email

  private val _password = mutableStateOf("")
  val password: State<String> = _password

  private val composite = CompositeDisposable()

  init {
    composite.add(authRepository.user.subscribe {
      _user.value = it
    })
  }

  fun setEmail(text: String) {
    _errors.value = ""

    _email.value = text.filter { !it.isWhitespace() }
  }

  fun setPassword(text: String) {
    _errors.value = ""

    _password.value = text
  }

  fun submit() {
    viewModelScope.launch {
      authRepository.signIn(email.value, password.value)

      when (authRepository.signIn(email.value, password.value)) {
        is Resource.Success -> _eventFlow.emit(UIEvent.NavigateEvent(Route.AppHome.route))
        else -> {}
      }
    }
  }

  fun logout() {
    viewModelScope.launch {
      authRepository.logout()

      _eventFlow.emit(UIEvent.NavigateEvent(Route.AuthSignInScreen.route))
    }
  }

  override fun onCleared() {
    composite.dispose()
  }
}