/**
 * Catálogo de obras de Denise.
 *
 * Para agregar una obra nueva:
 *   1. Copiar uno de los objetos de abajo.
 *   2. Completar todos los campos.
 *   3. Agregar las imágenes en assets/images/.
 *   4. El campo `id` debe ser único y sin espacios (ej: 'mi-nueva-obra').
 */

const OBRAS = [
  {
    id: 'atila-i',
    titulo: 'Atila I',
    coleccion: 'David',
    material: 'Mármol de Carrara',
    año: '2023',
    dimensiones: '45 × 20 × 18 cm',
    descripcion: 'Atila I es la pieza inaugural de la serie David, una exploración en torno a la figura y su relación con la quietud monumental. La forma emerge del bloque sin anunciarse: es hallazgo más que diseño. La superficie tallada conserva huellas del proceso — marcas de cincel que dialogan con las zonas pulidas, recordando que la obra es también su historia.',
    imagenPrincipal: './assets/images/atila.jpg',
    imagenes: [
      './assets/images/atila.jpg',
      './assets/images/denise.jpg',
    ],
  },
  {
    id: 'silencio-etereo',
    titulo: 'Silencio Etéreo No. 1',
    coleccion: 'David',
    material: 'Mármol blanco',
    año: '2023',
    dimensiones: '60 × 30 × 25 cm',
    descripcion: 'Primera pieza de una serie en curso que explora el silencio como materia. El mármol blanco, por su translucidez, capta la luz de manera que la forma parece respirar. El prototipo digital previo permitió estudiar cómo la luz incide en los planos antes de comprometer el material definitivo.',
    imagenPrincipal: './assets/images/denise.jpg',
    imagenes: [
      './assets/images/denise.jpg',
      './assets/images/atila.jpg',
    ],
  },
  {
    id: 'dryada-i',
    titulo: 'Dryada I',
    coleccion: 'Dryadas',
    material: 'Piedra calcárea',
    año: '2024',
    dimensiones: '80 × 35 × 30 cm',
    descripcion: 'Las Dryadas son espíritus del bosque en la mitología griega. Esta primera pieza de la serie evoca una presencia vegetal detenida en piedra. La textura rugosa de la calcárea contrasta con los bordes suavizados, creando una tensión entre lo natural y lo intervenido.',
    imagenPrincipal: './assets/images/atila.jpg',
    imagenes: [
      './assets/images/atila.jpg',
      './assets/images/denise.jpg',
    ],
  },
  {
    id: 'tension',
    titulo: 'Tensión',
    coleccion: 'Dryadas',
    material: 'Mármol negro',
    año: '2024',
    dimensiones: '50 × 15 × 15 cm',
    descripcion: 'Una columna que se tuerce sobre sí misma. Tensión explora el límite entre el equilibrio y el quiebre, entre la solidez de la piedra y la ilusión de movimiento. El mármol negro amplifica el contraste entre las superficies trabajadas y las zonas en bruto.',
    imagenPrincipal: './assets/images/denise.jpg',
    imagenes: [
      './assets/images/denise.jpg',
    ],
  },
  {
    id: 'estudio-iv',
    titulo: 'Estudio IV',
    coleccion: 'David',
    material: 'Mármol',
    año: '2022',
    dimensiones: '30 × 12 × 10 cm',
    descripcion: 'Pieza de estudio que antecede a Atila I. Una exploración en escala reducida de la masa y el vacío. El proceso de modelado 3D fue determinante para encontrar la proporción correcta antes de tallar el bloque definitivo.',
    imagenPrincipal: './assets/images/atila.jpg',
    imagenes: [
      './assets/images/atila.jpg',
    ],
  },
  {
    id: 'raiz',
    titulo: 'Raíz',
    coleccion: 'Dryadas',
    material: 'Granito',
    año: '2024',
    dimensiones: '90 × 40 × 35 cm',
    descripcion: 'La obra más densa de la serie Dryadas. El granito impone sus propias condiciones: su resistencia transforma el proceso en un diálogo entre la voluntad de la escultora y la dureza del material. La forma final es producto de esa negociación.',
    imagenPrincipal: './assets/images/denise.jpg',
    imagenes: [
      './assets/images/denise.jpg',
      './assets/images/atila.jpg',
    ],
  },
];
