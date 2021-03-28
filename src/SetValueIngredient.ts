import { AbstractIngredient } from "./AbstractIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

class ValueFrom implements JavaSerializable {
  value: number = 0;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20030423") {
      throw new Error("bad ValueFrom version");
    }

    this.value = reader.readShort();

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("ValueFrom data is corrupted");
    }
  }

  // Mirror-ish the Java version, which returns a singleton object for each value.
  readResolve(): "NATIVE" | "ADVANCED_PARAM" | "MULTI_ADJUST" | "OTHER_CHANNEL" {
    switch (this.value) {
      case 1:
        return "NATIVE";
      case 2:
        return "ADVANCED_PARAM";
      case 3:
        return "MULTI_ADJUST";
      case 4:
        return "OTHER_CHANNEL";
      default:
        throw new Error("invalid ValueFrom");
    }
  }
}

ObjectInputStream.RegisterObjectClass(ValueFrom, "com.erostek.eroslink.ValueFrom", "12855825877105598366");

export class SetValueIngredient extends AbstractIngredient implements JavaSerializable {
  value: number = 0.0;
  setIntensity: boolean = false;
  setFrequency: boolean = false;
  setPulseWidth: boolean = false;
  fullRange: boolean = false;
  cancelIntensityRamp: boolean = false;
  cancelFrequencyRamp: boolean = false;
  cancelPulseWidthRamp: boolean = false;
  intensityValueFrom: "NATIVE" | "ADVANCED_PARAM" | "MULTI_ADJUST" | "OTHER_CHANNEL" = "NATIVE";
  frequencyValueFrom: "NATIVE" | "ADVANCED_PARAM" | "MULTI_ADJUST" | "OTHER_CHANNEL" = "NATIVE";
  pulseWidthValueFrom: "NATIVE" | "ADVANCED_PARAM" | "MULTI_ADJUST" | "OTHER_CHANNEL" = "NATIVE";
  unknownBool: boolean = true;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20011107" && version !== "V2-20030226" && version !== "V3-20030328" && version !== "V4-20030423" && version !== "V4-20030425") {
      throw new Error("bad SetValueIngredient version");
    }

    this.value = reader.readDouble();
    this.setIntensity = reader.readBoolean();
    this.setFrequency = reader.readBoolean();
    this.setPulseWidth = reader.readBoolean();

    if (version === "V1-20011107") {
      this.fullRange = true;
      this.cancelIntensityRamp = true;
      this.cancelFrequencyRamp = true;
      this.cancelPulseWidthRamp = true;
      this.intensityValueFrom = "NATIVE";
      this.frequencyValueFrom = "NATIVE";
      this.pulseWidthValueFrom = "NATIVE";
      this.unknownBool = true;
    } else if (version === "V2-20030226") {
      this.fullRange = reader.readBoolean();
      this.cancelIntensityRamp = true;
      this.cancelFrequencyRamp = true;
      this.cancelPulseWidthRamp = true;
      this.intensityValueFrom = "NATIVE";
      this.frequencyValueFrom = "NATIVE";
      this.pulseWidthValueFrom = "NATIVE";
      this.unknownBool = true;
    } else if (version === "V3-20030328") {
      this.fullRange = reader.readBoolean();
      const cancelRamp = reader.readBoolean();
      this.cancelIntensityRamp = cancelRamp;
      this.cancelFrequencyRamp = cancelRamp;
      this.cancelPulseWidthRamp = cancelRamp;
      this.intensityValueFrom = "NATIVE";
      this.frequencyValueFrom = "NATIVE";
      this.pulseWidthValueFrom = "NATIVE";
      this.unknownBool = true;
    } else if (version === "V4-20030423") {
      this.fullRange = reader.readBoolean();
      const cancelRamp = reader.readBoolean();
      this.cancelIntensityRamp = cancelRamp;
      this.cancelFrequencyRamp = cancelRamp;
      this.cancelPulseWidthRamp = cancelRamp;
      this.intensityValueFrom = reader.readObject();
      this.frequencyValueFrom = reader.readObject();
      this.pulseWidthValueFrom = reader.readObject();
      this.unknownBool = reader.readBoolean();
    } else {
      this.fullRange = reader.readBoolean();
      this.cancelIntensityRamp = reader.readBoolean();
      this.cancelFrequencyRamp = reader.readBoolean();
      this.cancelPulseWidthRamp = reader.readBoolean();
      this.intensityValueFrom = reader.readObject();
      this.frequencyValueFrom = reader.readObject();
      this.pulseWidthValueFrom = reader.readObject();
      this.unknownBool = reader.readBoolean();
    }

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("SetValueIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(SetValueIngredient, "com.erostek.eroslink.SetValueIngredient", "14652491185422251312");
