## Proyecto E-Commerce

Sistemas y Tecnologias Web

El link a Firebase es: [Firebase](ecommercesytw.web.app )

--------------------------------------------

## Components
El proyecto se dividio en varios componentes. Uno de ellos fue la barra de navegacion.

### Header
Luego, dentro de la carpeta de Header, se encuentra el componente que genera la barra de navegacion entre las "paginas".
Este tiene dos archivos. El primero Navbar.jsx, maneja todos los datos y lo que se va renderizando en la pagina. Lo que se ve en el Navbar.scss son los estilos y como es que se configuro esta barra para que se viera lo mas parecido posible.

Lo mas importante de Navbar es que utliza la siguiente funcion:
```bash
{MenuItems.map((item, index) => {
            return (
              <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {item.Title}
                  </a>
                </li>
            );
          })}
```
Esta es una funcion basica que genera los links de la barra de navegación

### APP
Luego se tiene el documento de app que es el que maneja toda la pagina web.

Para iniciar el proyecto localmente se tiene que iniciar en consola con el codigo que se presenta a continuacion que crea una pagina local en http://localhost:5173.

el codigo es:
```bash
npm run dev
```
En el caso de que se quiera instalar algo, como algunas dependencias, se debe introducir como:

```bash
npm install (la dependencia o el componente que se quiere instalar)
```
Ya con esto se puede modificar o arreglar algo si es que se necesitara.

---------------------------------------------------------------------------------------------------------------------------------------------------

Las tecnologias que se utilizaron en este proyecto fueron:

### React
Esta es la tecnologia base de mi pagina web, maneja todas las funciones y mejora la IHC.
### JavaScript (JSX)
Esta extencion no es la misma que la javascrips que se utiliza normalmente ya que el JSX es una que se utiliza de manera constante con React ya que ayuda a "describir cómo debería ser la interfaz de usuario"
### Vite
Es un compilador que mejora el tiempo y el uso de react ya que actualiza de manera constante el trabajo y se pueden ver los cambios inmediatamente
### Sass
Es una mejora a CSS ya que cambia la manera en que se ordenan los documentos y mejora la interaccion con los desarrolladores.
### Firebase
Firebase se utiliza de gran manera para poder hacer la autenticacion de las personas, el guardado de los datos de los productos, y la compra de los mismos
