import BackBtn from "@/components/shared/backBtn";
import { updateContent } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import {
  BannerContent,
  BannerForm,
  FormFields,
} from "@/types/sectionsTypes/banner";
import Field from "./field";
import EditText from "../../../settingsUi/EditText";
import SelectCountryCode from "../../../settingsUi/SelectCountryCode";
import { Label } from "@/components/ui/label";

interface FormTabProps {
  pageId: string;
  bannerContent: BannerContent;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  setOpenFormTab: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormTab({
  pageId,
  bannerContent,
  findSelectedSection,
  setOpenFormTab,
}: FormTabProps) {
  const { form } = bannerContent;
  const dispatch = useAppDispatch();

  const hasActiveTelField = form.fields.some(
    (field) => field.type === "tel" && field.active
  );

  const updateFormFields = (fieldId: string, updates: Partial<FormFields>) => {
    const updatedFields = form.fields.map((field) =>
      field.id === fieldId ? { ...field, ...updates } : field
    );

    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        form: {
          ...form,
          fields: updatedFields,
        },
      })
    );
  };

  const updateForm = (updates: Partial<BannerForm>) => {
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        form: {
          ...form,
          ...updates,
        },
      })
    );
  };

  return (
    <div>
      <BackBtn label="Form" handleBack={() => setOpenFormTab(false)} />
      <div className="px-5 space-y-2">
        <span className="text-muted-foreground text-xs">
          Select and customize the fields to collect for your audience.
        </span>
        <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
          {form.fields.map((field) => (
            <Field
              key={field.id}
              field={field}
              updateFormFields={updateFormFields}
            />
          ))}
        </div>
        <EditText
          label="Button"
          inputType="text"
          placeholder="Sign up"
          id={form.button.id}
          value={form.button.text}
          handleUpdate={(e) => {
            updateForm({ button: { ...form.button, text: e.target.value } });
          }}
        />
        <EditText
          label="Success"
          inputType="text"
          placeholder="Successfully submitted message"
          id="Success"
          value={form.successMessage}
          handleUpdate={(e) => {
            updateForm({ successMessage: e.target.value });
          }}
        />

        {hasActiveTelField && (
          <div className="space-y-1 flex items-center justify-between">
            <Label htmlFor="Currency">Country Code</Label>
            <div className="w-4/6 ">
              <SelectCountryCode
                value={form.countryCode.code}
                onChange={(countryCode) => {
                  updateForm({
                    countryCode: countryCode,
                  });
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormTab;
