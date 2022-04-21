import { createLocalVue, mount } from "@vue/test-utils";
import Bar from "@/components/Bar.vue";
import Vuex from "vuex";
import { actionsMixin } from "@/mixins/actionsMixin.js";
import mockCharacter from "../../mock-data/characters.json";
import { store } from "@/store/store";

describe("Bar.vue", () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.mixin(actionsMixin);
    localVue.use(Vuex);
  });
  it("Should call changeLink method when li is clicked", async () => {
    const wrapper = mount(Bar, {
      localVue,
      store,
      propsData: {
        link: "All",
      }
    });
    const spyOpenModal = jest.spyOn(wrapper.vm, "changeLink");
    wrapper.find("li").trigger("click");
    await wrapper.vm.$nextTick();
    expect(spyOpenModal).toHaveBeenCalled();
  });
  it("First li should have clicked-active class when mounted for first time", () => {
    // Arrange
    const wrapper = mount(Bar, {
      localVue,
      store,
      propsData: {
        link: "All",
      }
    });
    const firstLi = wrapper.find("li");
    expect(firstLi.classes()).toContain("clicked-active");
  });
});
