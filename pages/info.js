function Info() {
  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl my-3">Acerca del proyecto</h1>
      <p className="my-2">
        svstamp.com surge como respuesta a la necesidad de tener un archivo
        público y colaborativo de <i>tweetstamps</i> con facilidad de búsqueda y
        organización. Aunque se puede almacenar cualquier enlace, el enfoque
        principal es archivar stamps de figuras públicas con el objetivo de
        exigir responsabilidad sobre ideas, acciones y opiniones publicadas en
        Twitter.
      </p>
      <h1 className="text-2xl my-3">Condiciones de uso</h1>
      <p className="my-2">
        svstamp.com se apoya de los datos almacenados en{' '}
        <a className="text-blue-700" href="https://tweetstamp.org/">
          tweetstamp.org
        </a>{' '}
        para poder brindar un archivo navegacble y accesible.
      </p>
      <p className="my-2">
        Cualquier enlace de{' '}
        <a className="text-blue-700" href="https://tweetstamp.org/">
          tweetstamp.org
        </a>{' '}
        es aceptado en la plataforma exceptuando los siguientes casos:
      </p>
      <ul className="list-disc list-inside">
        <li>Contenido con violencia explícita</li>
        <li>Contenido sexual explícito</li>
      </ul>
      <p className="my-2 underline">
        Cualquier enlace puede ser eliminado a discreción de moderadores sin
        previo aviso.
      </p>
      <h1 className="text-2xl my-3">Política de Privacidad</h1>
      <p className="my-2">
        svtamp.com no utiliza ningún <i>script</i> de <i>analytics</i> para
        registrar visitas ni realiza ningún seguimiento de comportamiento de
        usuarios. De igual manera, el sitio no almacena ninguna información de
        visitantes a través de <i>cookies</i> y se limita a almacenar la
        información proporcionda en por el usuario en forma de enlaces de
        <a className="text-blue-700" href="https://tweetstamp.org/">
          tweetstamp.org
        </a>
      </p>
      <p className="my-6 italic">Última actualización: 21 de mayo, 2020</p>
    </div>
  );
}

export default Info;
