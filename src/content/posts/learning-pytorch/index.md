---
title: "Learning Log: PyTorch Deep Learning"
type: log
date: 2025-03-17
tags: [machine-learning]
status: wip
legacyPath: ["/articles/learning_pytorch"]
---

# Learning Log: PyTorch Deep Learning

The freeCodeCamp.org [PyTorch deep learning tutorial](https://www.youtube.com/watch?v=V_xro1bcAuA) is over 25 hours (1537 minutes) long. How long can I endure it?

https://www.youtube.com/watch?v=V_xro1bcAuA

Here are my notes from learning the subject during spring 2025.

## Delving In

*Deep learning* is a subset of *machine learning*, which finds patterns in data. This requires the idealized output (labels; supervised learning) from the inputs (features) so the algorithm can check how good it is. This is better-suited than traditional programming for processes with patterns that are difficult for humans to understand.

*Deep learning* (DL) is a subset of *machine learning* (ML), which finds patterns in data. This requires the idealized output (labels; supervised learning) from the inputs (features) so the algorithm can check how good it is. This is better-suited than traditional programming for processes with patterns that are difficult for humans to understand (too many rules/variations/too much data).

Deep learning is not explainable, much like our conscious brains must estimate the thought process that occurred in our subconscious. This can make it a bit difficult to predict or fix errors. DL is also rather data-hungry, similarly to the necessitation of Meta's [mass piracy of literature](https://www.reuters.com/technology/artificial-intelligence/meta-knew-it-used-pirated-books-train-ai-authors-say-2025-01-09/) to feed their AI models.

Traditional machine learning, such as a *gradient-boosted machine*, is good for structured data. Deep learning, such as *neural networks* (NNs), is better for unstructured data such as observations in the real world.

Traditional ML methods ("shallow methods"):

- Gradient-boosted models
- Nearest neighbor
- Naïve Bayes

DL methods ("deep methods"):

- Neural networks (NNs)
- Fully-connected neural networks
- Convolutional neural networks (CNNs)
- Transformers (good for high-dimensional data)

The above NN types are the original fundamentals.

## Neural Networks

NNs are a biomimetic structure of neuron-like *nodes* that are connected by synapse-like *edges* that send signals with weights that are altered by the nodes before it. This does a bunch of transformations on the inputs that leads to a certain conclusion in whatever output space. They can be trained in various ways to do this most effectively (to get the best "weights").

This is used for unstructured data, but, because we are working with computers, they must be numbers encoded in bits.

The *architecture* of a NN has an input layer, various numbers of hidden layers, and an output layer. I theorize that, if hidden layers can indeed be represented as matrix transformations, then maybe the hidden layers can just be combined to one layer.

## Types of NN Learning

*Supervised learning* is the traditional method, wherein you have a lot of inputs and give the ML algorithm all of the idealized outputs so it knows how it's doing. It's able to grade and "supervise" itself.

*Unsupervised learning* finds patterns between the data, but it doesn't really have any concept of what is right or wrong or what anything means to us humans.

*Transfer learning* adapts weights to our own model so that our model can get a head start on finding the right weights.

*Reinforcement learning* (which is not being covered in this tutorial) operates on carrot-and-stick rewards and punishments to incentivize the model to succeed.

## Deep Learning

DL is different from ML due to the large amount of layers and sheer complexity of the data. This sort of avoids the Google ML rule of avoiding ML for things that can just be traditionally programmed and really stretches the capabilities of ML for the profound-yet-unexplainable observations that we expect oft-hyped omniscient models to produce.

## PyTorch

I will be using PyTorch v2.6.0 on Ubuntu 24 LTS. The second most-used machine learning program is TensorFlow, but the market share is lesser by far.

Input data is converted into $n$-dimensional arrangements of numbers called *tensors*. We preform transformations upon these tensors using the hidden layers (many of them--deep), harvest the output tensors (perhaps in a different space), and convert that output to something that humans can understand.

1. Preprocess data -- get it into a tensor
2. Use model
	1. Pretrained DL model
	2. Custom model
		- Find way to evaluate model predictions
3. Fitting model to data
4. Make predictions using model -- output tensor
5. Saving and loading models (exporting the weights)

## Docker

Since I am now getting into ML development on the same Ubuntu install where I have a lot of other projects going on, I was looking for a method to isolate these environments without having to worry about dependency conflicts and installing multiple versions of the same thing and having to choose which one to run (e.g. ROS1 Noetic and ROS2 Humble).

[Docker](https://docs.docker.com/desktop/) is an industry-standard tool for doing this, wherein you create various *Dockerfiles* that set up an isolated environment. You have to describe the packages that must be installed in sequence. In this way, you maintain consistency and also get self-documentation capabilities for the installation process. Follow the [installation instructions for Ubuntu here](https://docs.docker.com/engine/install/ubuntu/).

You can also apparently piggyback off of existing Docker images to make your script similar. This is my first Dockerfile:

```
FROM pytorch/pytorch:2.2.0-cuda12.1-cudnn8-runtime

WORKDIR /workspace

RUN apt-get update && apt-get install -y git wget unzip

RUN pip install torch torchvision torchaudio numpy matplotlib opencv-python pandas matplotlib scikit-learn tqdm requests jupyter seaborn

CMD ["bash"]
```

I have no idea what the `CMD ["bash"]` does, but I'll roll with it.

We can then run the Docker container and clone freeCodeCamp's [tutorial repo](https://github.com/mrdbourke/pytorch-deep-learning) after:

```
docker build -t fcc_pytorch_dl
docker run -it --rm --gpus all -v $(pwd):/workspace -p 8888:8888 fcc_pytorch_dl

# After env is good

## Clone tutorial repo
git clone https://github.com/mrdbourke/pytorch-deep-learning#course-materialsoutline

## Locally start the JUpyter notebook on port 8888
jupyter notebook --ip=0.0.0.0 --port=8888 --allow-root
```

To list the current containers, I can use `docker ps -a`.

```
sudo docker build -t fcc_pytorch_dl .
sudo docker run -it fcc_pytorch_dl bash
```

I then cloned the tutorial repository to the `/workspace` directory. To be able to access the jupyter notebook server from your browser outside of the container:

```
docker run -it -p 8888:8888 fcc_pytorch_dl jupyter notebook --ip=0.0.0.0 --allow-root
```

Then go to `localhost:8888` and paste in the token you get embedded in a URL from the output of the above command.

There's an error here--when I access the Jupyter server from outside of the container, there are no files present.

Let's worry about how to fix Docker later. Now back to the tutorial.

## Tensors

For an $n$-dimensional tensor, $\mathcal{T}\in\mathbb{R}^{d_1\times d_2 \times\ldots \times d_n}$ where $d_n$ are each of the $n$ dimensions.

A tensor of $n$-dim can be created with `torch.zeros([d1, d2, d3, ...])`. Inputting the values manually can be done with `torch.tensor()`.

- `.ndim` finds the number of dimensions $n$
- `.item()` gets the number for a one-element tensor
