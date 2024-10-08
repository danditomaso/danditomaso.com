export function Analytics() {
  const token = process.env.NEXT_PUBLIC_BEAM_TOKEN;

  if (!token) {
    return null;
  }
  return <script src="/vendor/analytics/beam.min.js" data-token={token} async />;
}
