import "bootstrap";
import { moveBlackLines } from '../components/moving_items';
import { moveBlackLinesInCircle } from '../components/moving_circle_items';
import { moveBlackCircles } from '../components/moving_radius_items';
import { openEye } from '../components/openEyes';
import { drawCanvas } from '../components/max_canvas';
import { testsThree } from '../components/three_d';
import { threeSandbox } from '../components/three_sandbox';
import { fractalTree } from '../components/fractal_trees';
import { cleanThree } from '../components/clean_three';

// moveBlackCircles();
// openEye();
drawCanvas();
testsThree();
threeSandbox();
fractalTree();
cleanThree();
