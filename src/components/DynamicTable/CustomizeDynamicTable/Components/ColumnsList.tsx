import React from "react";

import { Droppable, DroppableStateSnapshot } from "react-beautiful-dnd";

import { useEffect, useState } from "react";

export interface ColumnsListProps {
  columnId: string;
  children: React.ReactNode;
}

//// below implementation didn't work for React 18 inside of StrictMode. Found here: https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1167427762

// const ColumnsList = ({ columnId, children }: ColumnsListProps) => {
//   return (
//     <div>
//       <Droppable droppableId={columnId}>
//         {(probided, snapschot: DroppableStateSnapshot) => (
//           <div ref={probided.innerRef} {...probided.droppableProps}>
//             {children}
//             {probided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// };

const ColumnsList = ({ children, columnId }: ColumnsListProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div>
      <Droppable droppableId={columnId}>
        {(probided, snapschot: DroppableStateSnapshot) => (
          <div ref={probided.innerRef} {...probided.droppableProps}>
            {children}
            {probided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ColumnsList;
