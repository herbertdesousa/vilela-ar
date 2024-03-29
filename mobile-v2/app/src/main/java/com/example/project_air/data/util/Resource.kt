package com.example.project_air.data.util

sealed class Resource<T>(val data: T? = null, val errMessage: String? = null) {
  class Success<T>(data: T) : Resource<T>(data)
  class Loading<T>() : Resource<T>()
  class Error<T>(message: String, data: T? = null) : Resource<T>(data, message)
}
