Buenas! Dejo aquí algunas aclaraciones sobre la app.

- El front es completamente responsive hasta un vw de 250px.

- Desde el Front hay acceso a todas las rutas del back, exceptuando el usersRouter.get('/', [isAdmin], getUsers), ya que no es necesario para un end-user.

- Hay ciertos elementos que están en componentes "innecesarios" que no se repiten, pero es así para que el código sea más legible al estar mejor separado/estructurado según la necesidad.

- En algunas funciones de componentes, hay parámetros opcionales (en objetos {}) que no llegué a usar, las hice para tener distintas opciones al usar los componentes, pero hay alguna que finalmente nunca usé.

- Evito el uso de document.querySelector() (y en vez de ello envió las variables a los componentes) para poder cambiar las clases y otros selectores libremente sin romper el programa.

- Se puede navegar siempre en la app a través del header, si está por ejemplo en uno de los formularios, puede salir de el pulsando el logo.

- Hay un manejo de errores completo.

- Creo que eso es todo, muchas gracias. 🙂
