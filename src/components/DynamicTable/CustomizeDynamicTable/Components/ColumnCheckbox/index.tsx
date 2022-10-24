import React from "react";
import { Draggable, DraggableStateSnapshot } from "react-beautiful-dnd";
import Tooltip from "@mui/material/Tooltip";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

import { ReactComponent as DragIcon } from "./dragIcon.svg";
import { Container } from "./styles";
import { FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface ColumnCheckboxProps {
  dataColumnId: string;
  dragColor?: string;
  selectHighlightColor?: string;
  dragDisabledColor?: string;
  children: React.ReactNode;
  checked: CheckboxProps["checked"];
  value: CheckboxProps["value"];
  onChange: CheckboxProps["onChange"];
  dndProps: {
    draggableId: React.Key;
    indexForDraggable: number;
    isDragDisabled?: boolean;
  };
}

const ColumnCheckbox = ({
  dataColumnId,
  dragColor,
  selectHighlightColor,
  dragDisabledColor,
  children,
  checked,
  value,
  onChange,
  dndProps: { draggableId, indexForDraggable, isDragDisabled },
}: ColumnCheckboxProps) => {
  const { t } = useTranslation();

  return (
    <Draggable
      draggableId={`${draggableId}`}
      index={indexForDraggable}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapschot: DraggableStateSnapshot) =>
        isDragDisabled ? (
          // I claim that all columns that can be slided should be fixed and next to each other. That's why I posted below code. Otherwise you would make for example 6th column fixed and whe sliding it would be far away from the 1st one and it would look pretty weird
          <Tooltip title={t("fixedColumnWarning") || ""}>
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isCurrentlyDragging={snapschot.isDragging}
              dragColor={dragColor}
              selectHighlightColor={selectHighlightColor}
              isDragDisabled={isDragDisabled}
              data-column-id={dataColumnId}
              dragDisabledColor={dragDisabledColor}
              data-testid="columnCheckboxContainer"
              style={{ alignItems: "center", ...provided.draggableProps.style }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    value={value}
                    onChange={onChange}
                  />
                }
                label={children}
              />

              <DragIcon className="dragIcon" />
            </Container>
          </Tooltip>
        ) : (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isCurrentlyDragging={snapschot.isDragging}
            dragColor={dragColor}
            selectHighlightColor={selectHighlightColor}
            isDragDisabled={isDragDisabled}
            data-column-id={dataColumnId}
            dragDisabledColor={dragDisabledColor}
            data-testid="columnCheckboxContainer"
            style={{ alignItems: "center", ...provided.draggableProps.style }}
          >
            <FormControlLabel
              control={
                <Checkbox checked={checked} value={value} onChange={onChange} />
              }
              label={children}
            />
            <DragIcon className="dragIcon" />
          </Container>
        )
      }
    </Draggable>
  );
};

export default ColumnCheckbox;
