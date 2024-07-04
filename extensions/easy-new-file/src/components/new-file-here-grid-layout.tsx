import { codeFileTypes, documentFileTypes, scriptFileTypes, TemplateType } from "../types/file-type";
import React from "react";
import { Grid } from "@raycast/api";
import { isEmpty, isImage } from "../utils/common-utils";
import { parse } from "path";
import { ActionNewTemplateFileHere } from "./action-new-template-file-here";
import { NewFileHereEmptyView } from "./new-file-here-empty-view";
import { NewFileHereItem } from "./new-file-here-item";
import { columns, itemInset, layout, showCode, showDocument, showScript } from "../types/preferences";

export function NewFileHereGridLayout(props: {
  navigationTitle: string;
  isLoading: boolean;
  templateFiles: TemplateType[];
  folder: string;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { navigationTitle, isLoading, templateFiles, folder, setRefresh } = props;
  return (
    <Grid
      navigationTitle={navigationTitle}
      inset={isEmpty(itemInset) ? undefined : (itemInset as Grid.Inset)}
      columns={parseInt(columns)}
      aspectRatio={"3/2"}
      isLoading={isLoading}
      searchBarPlaceholder={"Search and create files"}
      selectedItemId={templateFiles.length > 0 ? templateFiles[0].path : ""}
    >
      <NewFileHereEmptyView
        layout={layout}
        title={"No Templates"}
        description={"You can add template from the Action Panel"}
        setRefresh={setRefresh}
      />
      <Grid.Section title={"Template"}>
        {templateFiles.map((template, index) => {
          return (
            <Grid.Item
              id={template.path}
              key={template.path}
              keywords={[template.extension]}
              content={{
                value: isImage(parse(template.path).ext) ? { source: template.path } : { fileIcon: template.path },
                tooltip: template.name + "." + template.extension,
              }}
              title={template.name}
              quickLook={{ path: template.path, name: template.name }}
              actions={
                <ActionNewTemplateFileHere
                  template={template}
                  index={index}
                  templateFiles={templateFiles}
                  folder={folder}
                  setRefresh={setRefresh}
                />
              }
            />
          );
        })}
      </Grid.Section>
      {!isLoading && showDocument && (
        <Grid.Section title={"Document"}>
          {documentFileTypes.map((fileType, index) => {
            return (
              <NewFileHereItem
                key={fileType.languageId}
                layout={layout}
                fileType={fileType}
                newFileType={{ section: "Document", index: index }}
                templateFiles={templateFiles}
                folder={folder}
                setRefresh={setRefresh}
              />
            );
          })}
        </Grid.Section>
      )}
      {!isLoading && showCode && (
        <Grid.Section title={"Code"}>
          {codeFileTypes.map((fileType, index) => {
            return (
              <NewFileHereItem
                key={fileType.languageId}
                layout={layout}
                fileType={fileType}
                newFileType={{ section: "Code", index: index }}
                templateFiles={templateFiles}
                folder={folder}
                setRefresh={setRefresh}
              />
            );
          })}
        </Grid.Section>
      )}
      {!isLoading && showScript && (
        <Grid.Section title={"Script"}>
          {scriptFileTypes.map((fileType, index) => {
            return (
              <NewFileHereItem
                key={fileType.languageId}
                layout={layout}
                fileType={fileType}
                newFileType={{ section: "Script", index: index }}
                templateFiles={templateFiles}
                folder={folder}
                setRefresh={setRefresh}
              />
            );
          })}
        </Grid.Section>
      )}
    </Grid>
  );
}
