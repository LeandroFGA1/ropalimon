import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const AboutUs = () => {
  return (
    <div className="p-6 bg-gray-50">
      {/* Misión y Visión */}
      <section className="mb-8">
        <Typography variant="h2" color="blue-gray" className="text-center mb-4">
          Nuestra Misión
        </Typography>
        <Card className="max-w-4xl mx-auto mb-6">
          <CardBody>
            <Typography variant="h6" color="gray">
              Nuestra misión se centra en construir valor circular y sustentable junto a nuestros clientes con el fin alargar la vida útil de los desechos textiles, recuperar o reciclar mediante procesos que preservan el medioambiente mediante la mitigación de los efectos adversos de los desechos textiles.
            </Typography>
          </CardBody>
        </Card>
        <Typography variant="h2" color="blue-gray" className="text-center mb-4">
          Nuestra Visión
        </Typography>
        <Card className="max-w-4xl mx-auto">
          <CardBody>
            <Typography variant="h6" color="gray">
              Ser reconocidos como la empresa líder en reciclaje textil a nivel industrial, generando relaciones de confianza a largo plazo con nuestros clientes a través de un desarrollo económico sostenible.
            </Typography>
          </CardBody>
        </Card>
      </section>

      {/* ¿Por qué reciclar ropa? */}
      <section className="mb-8">
        <Typography variant="h2" color="blue-gray" className="text-center mb-4">
          ¿Por qué reciclar ropa?
        </Typography>
        <Card className="max-w-4xl mx-auto">
          <CardBody>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                La industria textil es responsable del 10% de las emisiones de carbono a nivel global y produce alrededor del 20% de las aguas residuales mundiales.
              </li>
              <li>
                Es la segunda industria más contaminante después de la petrolera, consumiendo más energía que la aviación y el transporte marítimo.
              </li>
              <li>
                Cada segundo se entierra o quema fibra textil equivalente a un camión de basura.
              </li>
              <li>
                En Chile, entre 36 a 39 mil toneladas de ropa son desechadas anualmente en el desierto de Atacama.
              </li>
              <li>
                Solo un 1% de la ropa se recicla, mientras que el 73% termina en vertederos.
              </li>
            </ul>
          </CardBody>
        </Card>
      </section>

      {/* Beneficios del reciclaje */}
      <section>
        <Typography variant="h2" color="blue-gray" className="text-center mb-4">
          Beneficios del reciclaje textil
        </Typography>
        <Card className="max-w-4xl mx-auto">
          <CardBody>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Reduce las emisiones de gases de efecto invernadero.</li>
              <li>Disminuye la contaminación de suelos y aguas.</li>
              <li>Fomenta la economía circular y el uso responsable de recursos.</li>
              <li>Contribuye a la creación de empleos en la industria del reciclaje.</li>
              <li>Promueve un estilo de vida más sostenible.</li>
            </ul>
          </CardBody>
        </Card>
      </section>
    </div>
  );
};

export default AboutUs;
