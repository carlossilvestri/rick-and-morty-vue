import { createLocalVue, mount } from "@vue/test-utils";
import Card from "@/components/Card.vue";
import Vuex from "vuex";
import { actionsMixin } from "@/mixins/actionsMixin.js";
import mockCharacter from "../../mock-data/characters.json";
import { store } from "@/store/store";

describe("Card.vue", () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.mixin(actionsMixin);
    localVue.use(Vuex);
  });

  it("Must show info prop object", () => {
    // Arrange
    const wrapper = mount(Card, {
      localVue,
      store,
      propsData: {
        info: mockCharacter,
      }
    });

    const infoImage = wrapper.find("[data-testId='image']");
    const infoName = wrapper.find("[data-testId='info-name']");
    const infoLocationName = wrapper.find("[data-testId='info-location-name']");
    const infoCreated = wrapper.find("[data-testId='info-created']");

    // Assert
    expect(infoImage.element.src.length).toBeGreaterThan(0);
    expect(infoName.element.textContent.length).toBeGreaterThan(0);
    expect(infoLocationName.element.textContent.length).toBeGreaterThan(0);
    expect(infoCreated.element.textContent.length).toBeGreaterThan(0);
  });
  it("Should call openModal method when cont-text-card is clicked", async () => {
    const wrapper = mount(Card, {
      localVue,
      store,
      propsData: {
        info: mockCharacter,
      }
    });
    const spyOpenModal = jest.spyOn(wrapper.vm, "openModal");
    wrapper.find("[data-testId='cont-text-card']").trigger("click");
    await wrapper.vm.$nextTick();
    expect(spyOpenModal).toHaveBeenCalled();
  });
});
