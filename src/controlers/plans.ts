import Plan from '../models/Plan';

export const getPlans = async (req: any, res: any) => {
    try {
        const allPlans = await Plan.find()
        res.send(allPlans)

    } catch (error: any) {
        console.error(error);
        res.status(error.status).send(error.message)
    }
};

export const postPlans = async (req: any, res: any) => {
    const plan = req.body;
    try {
        const newPlan = new Plan(plan);
        newPlan.save();
        res.send(newPlan)

    } catch (error: any) {
        console.error(error);
        res.status(error.status).send(error.message)
    }
};

export const putPlans = async (req: any, res: any) => {
    const { id } = req.params;
    const plan = req.body;
    try {
        
        const userUpdeted = await Plan.findByIdAndUpdate(id, plan, { new: true });
        res.send(userUpdeted)

    } catch (error: any) {
        console.error(error);
        res.status(error.status).send(error.message)
    }
};