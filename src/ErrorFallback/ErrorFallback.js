import { useErrorBoundary } from "react-error-boundary";
  function ErrorFallback({ error }) {
  const { resetBoundary } = useErrorBoundary();
  // console.log(error);
  return (
    
    <div role="alert" className="error">
      <p>Something went wrong. Try after sometime</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
}


export default ErrorFallback;

// function ErrorFallback({error}){
//   return(
//     <div role="alert">
//       <p>No user provided</p>
//       <pre>{error.message}</pre>
//     </div>
//   );
// }


