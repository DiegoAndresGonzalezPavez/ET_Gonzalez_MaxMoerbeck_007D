import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'actualizar/:id',
    loadChildren: () => import('./actualizar/actualizar.module').then( m => m.ActualizarPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule),
  },
  {
    path: 'listado-clases',
    loadChildren: () => import('./listado-clases/listado-clases.module').then( m => m.ListadoClasesPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'detalle-clase',
    loadChildren: () => import('./detalle-clase/detalle-clase.module').then( m => m.DetalleClasePageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'registro-asistencia',
    loadChildren: () => import('./registro-asistencia/registro-asistencia.module').then( m => m.RegistroAsistenciaPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'seleccionar-clase-fecha',
    loadChildren: () => import('./seleccionar-clase-fecha/seleccionar-clase-fecha.module').then( m => m.SeleccionarClaseFechaPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'listado-asistencia',
    loadChildren: () => import('./listado-asistencia/listado-asistencia.module').then( m => m.ListadoAsistenciaPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'crear-clase',
    loadChildren: () => import('./crear-clase/crear-clase.module').then( m => m.CrearClasePageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'resumen-asistencia',
    loadChildren: () => import('./resumen-asistencia/resumen-asistencia.module').then( m => m.ResumenAsistenciaPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'detalle-justificacion',
    loadChildren: () => import('./detalle-justificacion/detalle-justificacion.module').then( m => m.DetalleJustificacionPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'justificacion',
    loadChildren: () => import('./justificacion/justificacion.module').then( m => m.JustificacionPageModule),
    canActivate: [AutorizadoGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
