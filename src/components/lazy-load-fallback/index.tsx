import { CircularProgress } from '@equinor/eds-core-react'
import type { FunctionComponent } from 'react'

import './style.css'

const messages = Object.freeze([
  'Adding Hidden Agendas',
  'Adjusting Bell Curves',
  'Aligning Covariance Matrices',
  'Applying Feng Shui Shaders',
  'Asserting Packed Exemplars',
  'Attempting to Lock Back-Buffer',
  'Binding Sapling Root System',
  'Building Data Trees',
  'Calculating Inverse Probability Matrices',
  'Calculating Llama Expectoration Trajectory',
  'Calibrating Blue Skies',
  'Cohorting Exemplars',
  'Collecting Meteor Particles',
  'Compounding Inert Tessellations',
  'Computing Optimal Bin Packing',
  'Containing Existential Buffer',
  'Correctign Typos',
  'Deciding What Message to Display Next',
  'Decomposing Singular Values',
  'Dicing Models',
  'Flushing Pipe Network',
  'Gathering Particle Sources',
  'Gesticulating Mimes',
  'Graphing Whale Migration',
  'Initializing Robotic Click-Path AI',
  'Inserting Sublimated Messages',
  'Integrating Curves',
  'Integrating Illumination Form Factors',
  'Iterating Cellular Automata',
  'Lecturing Errant Subsystems',
  'Modeling Object Components',
  'Normalizing Power',
  'Obfuscating Quigley Matrix',
  'Perturbing Matrices',
  'Randomizing User Portraits',
  'Realigning Alternate Time Frames',
  'Reconfiguring User Mental Processes',
  'Reevaluating Design Templates',
  'Relaxing Splines',
  'Removing Texture Gradients',
  'Resolving GUID Conflict',
  'Reticulating Splines',
  'Retracting Phong Shader',
  'Retrieving from Back Store',
  'Routing Neural Network Infrastructure',
  'Searching for Llamas',
  'Sequencing Particles',
  'Setting Universal Physical Constants',
  'Stratifying Ground Layers',
  'Synthesizing Gravity',
  'Time-Compressing Simulator Clock',
])

/**
 * Loading component with text
 */
export const LazyLoadMainFallback: FunctionComponent = () => (
  <div className="lazy-load-fallback">{messages[Math.floor(Math.random() * messages.length)]}…</div>
)

/**
 * Loading component with spinner
 */
export const LazyLoadFallback: FunctionComponent = () => (
  <div className="lazy-load-fallback">
    <CircularProgress size={16} /> Loading…
  </div>
)
