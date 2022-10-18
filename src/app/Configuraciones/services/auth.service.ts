import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Menu = [
    {
      modulo: "Funcionarios",
      submodulos: [
        { nombre: 'Funcionarios', ruta: 'usuarios', icon: 'group' },
        { nombre: 'Cuentas', ruta: 'cuentas', icon: 'badge' },
        { nombre: 'Grupo de trabajo', ruta: 'groupware', icon: 'groups' },

      ]
    },
    {
      modulo: "Configuraciones",
      submodulos: [
        { nombre: 'Administrar instituciones', ruta: 'instituciones', icon: 'group' },
        { nombre: 'Cuentas', ruta: 'cuentas', icon: 'badge' },
        { nombre: 'Grupo de trabajo', ruta: 'groupware', icon: 'groups' },

      ]
    }
  ]

  constructor() { }
}
