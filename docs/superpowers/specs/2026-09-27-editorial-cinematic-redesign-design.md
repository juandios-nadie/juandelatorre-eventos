# Juan de la Torre Eventos: Rediseño editorial cinematográfico

**Estado:** Aprobado por el usuario el 27 de septiembre de 2026.

## Objetivo

Convertir el sitio actual en una experiencia contemporánea, memorable y móvil primero que transmita buen gusto, profesionalismo y confianza, sin sacrificar la claridad comercial del catálogo ni la cotización por WhatsApp.

## Lectura de diseño

Este es un rediseño con preservación de marca para personas que organizan bodas, XV años, reuniones familiares, jardines y eventos empresariales en Guadalajara y Zapopan. La dirección será editorial cinematográfica con una ejecución práctica: fotografía real como protagonista, composición asimétrica, tipografía sans contemporánea y movimiento que refuerce jerarquía y narrativa.

- `DESIGN_VARIANCE: 8`: composiciones editoriales y ritmos visuales variados en escritorio; columna clara en móvil.
- `MOTION_INTENSITY: 6`: entradas coreografiadas, desplazamiento suave y respuesta táctil; sin efectos que dificulten navegar.
- `VISUAL_DENSITY: 3`: aire, fotografías grandes y mensajes breves.

## Auditoría del sitio actual

### Se conserva

- Logo y nombre de Juan de la Torre Eventos.
- Contenido real, inventario, fotografías y tono comercial local.
- Rutas `/`, `/catalogo`, `/studio`, filtros y anclas actuales.
- Sanity con sus datos de respaldo estáticos.
- Flujo de selección y cotización por WhatsApp.
- Metadatos, sitemap, robots, analítica y comportamiento accesible existente.
- Facebook como prueba viva del trabajo reciente.

### Se reemplaza o refina

- Playfair como voz dominante: actualmente hace que el sitio se parezca a muchas plantillas de servicios premium.
- Paleta crema, dorado y vino aplicada de forma extensa: se reduce a carbón, blanco mineral y un solo acento dorado.
- Tarjetas grandes y redondeadas repetidas sección tras sección.
- Encabezados repetitivos con etiqueta, título y párrafo en la misma composición.
- Hero recargado con chips y un panel adicional de prueba.
- Escasa narrativa de movimiento y poca diferenciación entre bloques.
- Catálogo visualmente funcional pero desconectado de una dirección editorial clara.

## Tesis visual

**El evento se siente antes de cotizarlo.**

La página debe mostrar el mobiliario dentro de eventos reales, con encuadres amplios y detalles de materialidad. El diseño no pretende competir con las fotografías: las organiza como una revista contemporánea y conduce al usuario hasta una cotización clara.

### Sistema visual

- Tema único: carbón profundo y blanco mineral, sin cambios abruptos entre modo claro y oscuro por sección.
- Acento único: dorado de marca, reservado para estados activos, foco y momentos de conversión.
- Tipografía: una familia sans variable para titulares y texto, con contraste mediante peso, escala y cursiva de la misma familia.
- Formas: radio medio consistente para fotografías y controles; botones tipo cápsula únicamente como regla de interacción.
- Fotografía: solo imágenes reales del inventario y los montajes. No se generarán imágenes que puedan confundirse con inventario disponible.
- Iconografía: una sola familia mantenida y accesible; no se dibujarán iconos decorativos a mano.

## Arquitectura de la experiencia

La arquitectura de información y los contratos de datos permanecen iguales. El rediseño se limita a composición, presentación, movimiento y estados visuales.

### Inicio

1. **Navegación flotante contenida**
   - Logo, Inicio, Catálogo, Contacto y CTA de cotización en una sola línea en escritorio.
   - Menú compacto con áreas táctiles de al menos 44 px en móvil.

2. **Hero cinematográfico asimétrico**
   - Fotografía real a gran escala con punto focal preservado.
   - Una sola promesa, una descripción breve y dos acciones: `Cotizar por WhatsApp` y `Ver catálogo`.
   - Sin chips, cifras decorativas ni paneles flotantes secundarios.

3. **Prueba operativa**
   - Inventario propio, montaje y cobertura expresados como una franja editorial debajo del hero.
   - Sin métricas inventadas ni testimonios falsos.

4. **Familias del catálogo**
   - Secuencia visual asimétrica con fotografías de diferentes proporciones.
   - Cada familia enlaza al filtro existente del catálogo.
   - En móvil se convierte en una lista vertical clara, sin scroll horizontal obligatorio.

5. **Eventos que ayudamos a montar**
   - Collage editorial con bodas, XV años, empresas y jardines.
   - Texto reducido a la decisión que ayuda a tomar cada imagen.

6. **Proceso de cotización**
   - Narrativa vertical con texto fijo y etapas que entran en secuencia.
   - La animación comunica progreso; la versión de movimiento reducido muestra todo en estado final.

7. **Galería de montajes**
   - Composición tipo revista con una imagen dominante y fotografías de apoyo.
   - No se superponen etiquetas sobre las imágenes; los pies son funcionales y breves.

8. **Actividad de Facebook**
   - Se conserva el contenido real, pero su contenedor se integra al sistema visual.
   - Si el embed no carga o colapsa, se muestra un fallback útil con enlace directo.

9. **Cotización rápida**
   - El formulario actual mantiene campos, orden y generación del mensaje.
   - Mejora de contraste, jerarquía, selección, foco, errores y resumen del mensaje.

10. **Cierre y contacto**
    - CTA final, teléfono, WhatsApp y Facebook con una sola intención por acción.
    - Pie compacto con información local y legal existente.

### Catálogo

- Hero más corto que el de inicio y alineado con la nueva tipografía.
- Filtros claros y pegajosos cuando sea útil, sin ocultar contenido.
- Tarjetas de producto con fotografía dominante, descripción legible y acciones jerarquizadas.
- La selección múltiple y el resumen de cotización conservan su lógica actual.
- Estados vacío, carga, error y selección son visibles y coherentes.

## Sistema de movimiento

- GSAP será el sistema principal de animación.
- Lenis será el único motor de desplazamiento suave y se conectará con ScrollTrigger.
- El hero tendrá una entrada breve que deja contenido y acciones utilizables desde el primer cuadro.
- Los títulos principales se revelarán con una secuencia contenida; el nombre accesible permanecerá completo.
- Las fotografías usarán transformaciones moderadas para comunicar profundidad y jerarquía.
- Los botones responderán a hover, foco y presión con CSS; no habrá cursor personalizado.
- `prefers-reduced-motion: reduce` desactiva suavizado, scrubbing y secuencias, y presenta el estado final de inmediato.
- No se usará Three.js: no aporta valor comercial suficiente frente al peso y complejidad que añade.

## Implementación técnica

- Los componentes de contenido y datos continúan como Server Components.
- La lógica de GSAP y Lenis se aísla en Client Components pequeños, con limpieza completa de listeners, timelines y triggers.
- No se cambia la API pública de `getSiteSettings`, `getCategories`, `getFeaturedItems`, filtros del catálogo ni generadores de enlaces de WhatsApp.
- Se usarán `next/image` y `next/font` conforme a la documentación instalada de Next.js 16.2.4.
- Las imágenes bajo el primer viewport tendrán carga diferida; la imagen LCP mantendrá prioridad y tamaños explícitos.
- La primera pintura será completa aun si JavaScript o animaciones fallan.

## Accesibilidad y rendimiento

- Contraste WCAG AA en texto, botones, campos, placeholders y estados de foco.
- Navegación completa por teclado y foco siempre visible.
- Áreas táctiles mínimas de 44 px.
- Alt text ligado al propósito real de cada fotografía.
- Sin texto significativo partido exclusivamente para animación.
- Objetivos: LCP menor de 2.5 s, INP menor de 200 ms y CLS menor de 0.1 en condiciones razonables de producción.
- Sin animaciones fuera de pantalla, listeners de scroll manuales ni propiedades de layout animadas.

## SEO y contenido

- No se cambian slugs, metadatos esenciales, títulos de rutas, sitemap ni robots sin una razón verificada.
- La jerarquía semántica conserva un solo `h1` por página y encabezados ordenados.
- El copy seguirá siendo español natural de Guadalajara y evitará promesas no comprobadas.
- Las cifras de Facebook solo se mostrarán cuando provengan de contenido real y sigan siendo pertinentes.

## Manejo de fallos

- Sanity ausente: se conserva el contenido estático actual.
- Imagen faltante: se usa una fotografía de respaldo real ya incluida en el proyecto.
- Facebook no disponible: aparece el fallback existente mejorado y el enlace directo.
- JavaScript desactivado: contenido, navegación y CTA principales siguen presentes.
- Movimiento reducido: todas las secciones aparecen completas sin transformaciones pendientes.
- Formulario incompleto: el mensaje puede continuar siendo genérico, sin bloquear el contacto.

## Verificación

Antes del despliegue se ejecutará:

- Suite completa de pruebas.
- ESLint.
- Compilación de producción.
- Revisión visual de inicio y catálogo en móvil y escritorio.
- Navegación por teclado y foco visible.
- `prefers-reduced-motion` y primera pintura sin animación.
- Consola del navegador y errores de recursos.
- Lighthouse o medición equivalente de rendimiento y accesibilidad.
- Búsqueda de placeholders, afirmaciones no comprobadas, guiones largos visibles y patrones visuales repetitivos.

## Estrategia de despliegue

1. Crear un artefacto de preview en Vercel.
2. Verificar inicio, catálogo, selección, formulario, WhatsApp y fallback de Facebook sobre el preview.
3. Promover el mismo artefacto a producción o desplegar a producción si el proyecto no admite promoción.
4. Comprobar `https://juandelatorreeventos.com/` y `/catalogo` sin autenticación.
5. Confirmar que el dominio canónico sirve el nuevo artefacto y que no hay errores de runtime visibles.

## Criterios de aceptación

- Inicio y catálogo comparten una identidad editorial cinematográfica reconocible.
- La primera pantalla se siente contemporánea y mantiene el CTA de WhatsApp visible.
- Al menos cuatro familias de layout diferentes evitan la repetición de tarjetas.
- Las imágenes reales dominan la narrativa sin afirmar inventario inexistente.
- Los flujos actuales de Sanity, filtros, selección y WhatsApp continúan funcionando.
- La experiencia móvil es tan clara como la de escritorio.
- El movimiento tiene fallback accesible y no bloquea interacción.
- Pruebas, lint y build terminan correctamente.
- El despliegue de producción queda verificado en el dominio canónico.
