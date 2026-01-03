import {Circle, Line, Rect, Txt, makeScene2D} from '@revideo/2d';
import {all, createRef, waitFor} from '@revideo/core';

/**
 * Motion Blur Demo Scene
 *
 * Split-screen comparison showing motion blur ON (left) vs OFF (right).
 * Uses per-element motion blur control to disable blur on the right side
 * while keeping it enabled on the left side.
 */
export default makeScene2D('motion-blur', function* (view) {
  // Create refs for animated elements
  const circleLeft = createRef<Circle>();
  const circleRight = createRef<Circle>();
  const rectLeft = createRef<Rect>();
  const rectRight = createRef<Rect>();

  // Screen dimensions
  const halfWidth = 960 / 2; // Half of 1920/2

  // Add all elements with explicit positions
  view.add(
    <>
      {/* Center divider line - no blur so it stays sharp */}
      <Line
        points={[
          [0, -540],
          [0, 540],
        ]}
        stroke="white"
        lineWidth={2}
        opacity={0.5}
        motionBlur={{enabled: false}}
      />

      {/* LEFT SIDE - Motion Blur ON (default, inherits from scene) */}
      <Txt
        text="Motion Blur: ON"
        fill="white"
        fontSize={36}
        fontFamily="Arial"
        fontWeight={600}
        x={-halfWidth}
        y={-400}
        motionBlur={{enabled: false}}
      />

      {/* Left circle - fast horizontal movement WITH blur */}
      <Circle
        ref={circleLeft}
        x={-halfWidth - 150}
        y={-100}
        width={100}
        height={100}
        fill="#3b82f6"
      />

      {/* Left rectangle - spinning WITH blur */}
      <Rect
        ref={rectLeft}
        x={-halfWidth}
        y={150}
        width={140}
        height={70}
        fill="#10b981"
        rotation={0}
      />

      {/* RIGHT SIDE - Motion Blur OFF (per-element override) */}
      <Txt
        text="Motion Blur: OFF"
        fill="white"
        fontSize={36}
        fontFamily="Arial"
        fontWeight={600}
        x={halfWidth}
        y={-400}
        motionBlur={{enabled: false}}
      />
      <Txt
        text="(per-element control)"
        fill="#888"
        fontSize={20}
        fontFamily="Arial"
        x={halfWidth}
        y={-360}
        motionBlur={{enabled: false}}
      />

      {/* Right circle - same animation, NO blur */}
      <Circle
        ref={circleRight}
        x={halfWidth - 150}
        y={-100}
        width={100}
        height={100}
        fill="#3b82f6"
        motionBlur={{enabled: false}}
      />

      {/* Right rectangle - same animation, NO blur */}
      <Rect
        ref={rectRight}
        x={halfWidth}
        y={150}
        width={140}
        height={70}
        fill="#10b981"
        rotation={0}
        motionBlur={{enabled: false}}
      />
    </>,
  );

  // Animate both sides identically
  // Left side will show motion blur, right side is reference
  yield* all(
    // Circle animations - fast horizontal sweep
    circleLeft().position.x(-halfWidth + 150, 0.4).to(-halfWidth - 150, 0.4),
    circleRight().position.x(halfWidth + 150, 0.4).to(halfWidth - 150, 0.4),
    // Rectangle animations - continuous spin
    rectLeft().rotation(720, 2),
    rectRight().rotation(720, 2),
  );

  yield* waitFor(0.3);

  // Second pass - even faster for more pronounced blur
  yield* all(
    circleLeft().position.x(-halfWidth + 150, 0.25).to(-halfWidth - 150, 0.25),
    circleRight().position.x(halfWidth + 150, 0.25).to(halfWidth - 150, 0.25),
  );

  yield* waitFor(0.3);

  // Third pass
  yield* all(
    circleLeft().position.x(-halfWidth + 150, 0.2).to(-halfWidth - 150, 0.2),
    circleRight().position.x(halfWidth + 150, 0.2).to(halfWidth - 150, 0.2),
  );
});
