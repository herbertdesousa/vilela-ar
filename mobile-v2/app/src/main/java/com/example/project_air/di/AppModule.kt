package com.example.project_air.di

import com.example.project_air.data.repository.AuthRepositoryInterface
import com.example.project_air.data.repository.FirebaseAuthRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {
  @Provides
  @Singleton
  fun providesAuthRepository(): AuthRepositoryInterface {
    return FirebaseAuthRepository()
  }
}